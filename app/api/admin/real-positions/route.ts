import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { apiErrorResponse } from "@/lib/api-error";
import { getDb } from "@/lib/mongodb";
import { getRealPositions, getTradeHistory } from "@/lib/trades";

async function ensureAdmin() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("ajx_admin");
  return !!adminCookie && adminCookie.value === "ok";
}

/**
 * GET /api/admin/real-positions?scopeUserId=…
 *
 * Returns the user's real (mobile-placed) positions and recent trades, with the
 * computed P&L plus any current override. Admin uses this to override what the
 * user sees on the mobile Orders screen.
 */
export async function GET(request: Request) {
  try {
    if (!(await ensureAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const url = new URL(request.url);
    const scopeUserId = url.searchParams.get("scopeUserId") || "";
    if (!scopeUserId || !ObjectId.isValid(scopeUserId)) {
      return NextResponse.json(
        { message: "scopeUserId is required" },
        { status: 400 },
      );
    }

    const [positions, trades] = await Promise.all([
      getRealPositions(scopeUserId),
      getTradeHistory(scopeUserId, 100),
    ]);

    // Trade history includes admin-config rows (id starts with "admin:") — strip those.
    const realTrades = trades.filter(
      (t) => typeof t.id === "string" && !t.id.startsWith("admin:"),
    );

    return NextResponse.json({
      positions: positions.map((p) => ({
        id: p.id,
        symbol: p.symbol,
        exchange: p.exchange,
        side: p.side,
        qty: p.qty,
        avgPrice: p.avgPrice,
        ltp: p.ltp,
        pnl: p.pnl,
        pnlPct: p.pnlPct,
        currentValue: p.currentValue,
        investedValue: p.investedValue,
        pnlOverridden: !!p.pnlOverridden,
      })),
      trades: realTrades.map((t) => ({
        id: t.id,
        symbol: t.symbol,
        exchange: t.exchange,
        side: t.side,
        qty: t.qty,
        price: t.price,
        productType: t.productType,
        status: t.status,
        pnl: t.pnl,
        pnlOverridden: !!(t as { pnlOverridden?: boolean }).pnlOverridden,
        createdAt: t.createdAt,
        executedAt: t.executedAt,
      })),
    });
  } catch (error) {
    return apiErrorResponse(
      error,
      "Admin real-positions GET error:",
      "Failed to load real positions",
    );
  }
}

/**
 * PATCH /api/admin/real-positions
 * Body: { kind: "position" | "trade", id, pnlOverride: number | null, pnlPctOverride?: number | null }
 *
 * Set or clear the P&L override on a position or trade document. Pass `null`
 * for `pnlOverride` to remove the override and restore live computation.
 */
export async function PATCH(request: Request) {
  try {
    if (!(await ensureAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = (await request.json()) as {
      kind?: "position" | "trade";
      id?: string;
      pnlOverride?: number | null;
      pnlPctOverride?: number | null;
    };
    const { kind, id } = body;
    if (kind !== "position" && kind !== "trade") {
      return NextResponse.json(
        { message: "kind must be 'position' or 'trade'" },
        { status: 400 },
      );
    }
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Valid id is required" },
        { status: 400 },
      );
    }

    const set: Record<string, unknown> = {};
    const unset: Record<string, "" | true> = {};

    const pnlVal = body.pnlOverride;
    if (pnlVal === null) {
      unset.pnlOverride = "";
    } else if (pnlVal !== undefined) {
      const n = Number(pnlVal);
      if (!Number.isFinite(n)) {
        return NextResponse.json(
          { message: "pnlOverride must be a finite number or null" },
          { status: 400 },
        );
      }
      set.pnlOverride = n;
    }

    if (kind === "position") {
      const pctVal = body.pnlPctOverride;
      if (pctVal === null) {
        unset.pnlPctOverride = "";
      } else if (pctVal !== undefined) {
        const n = Number(pctVal);
        if (!Number.isFinite(n)) {
          return NextResponse.json(
            { message: "pnlPctOverride must be a finite number or null" },
            { status: 400 },
          );
        }
        set.pnlPctOverride = n;
      }
    }

    if (Object.keys(set).length === 0 && Object.keys(unset).length === 0) {
      return NextResponse.json(
        { message: "No changes provided" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const collection = db.collection(kind === "position" ? "positions" : "trades");
    const update: Record<string, unknown> = {};
    if (Object.keys(set).length) update.$set = { ...set, updatedAt: new Date() };
    if (Object.keys(unset).length) update.$unset = unset;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      update,
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: `${kind === "position" ? "Position" : "Trade"} not found` },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Override saved", kind, id });
  } catch (error) {
    return apiErrorResponse(
      error,
      "Admin real-positions PATCH error:",
      "Failed to save override",
    );
  }
}
