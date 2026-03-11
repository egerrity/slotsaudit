import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, Treemap } from "recharts";

// ── Data ──────────────────────────────────────────────────────────────────
const RAW = [
  { lib:"Core", comp:"Filter chip group", region:"component", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"N", det:15, ins:200, total:1815 },
  { lib:"Core", comp:"Card", region:"content slot", pattern:"Hack Slot", hack:"Y", q1:"N",q2:"N",q3:"N",q4:"N", det:6, ins:297, total:4457 },
  { lib:"Core", comp:"Dropdown", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:12, ins:730, total:29531 },
  { lib:"Core", comp:"Dropdown", region:"field container", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:12, ins:730, total:29531 },
  { lib:"Core", comp:"Dropdown", region:"field container>start icon", pattern:"Swap", hack:"N", q1:"N",q2:"Y",q3:"N",q4:"N", det:12, ins:730, total:29531 },
  { lib:"Core", comp:"Dropdown", region:"field container>text wrapper", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"N",q4:"Y", det:12, ins:730, total:29531 },
  { lib:"Core", comp:"Dropdown", region:"field container>end", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:12, ins:730, total:29531 },
  { lib:"Core", comp:"Toast", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"N",q3:"Y",q4:"Y", det:4, ins:570, total:1377 },
  { lib:"Core", comp:"Toast", region:"icon", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:4, ins:570, total:1377 },
  { lib:"Core", comp:"Toast", region:"message", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:4, ins:570, total:1377 },
  { lib:"Core", comp:"Toast", region:"actions", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:4, ins:570, total:1377 },
  { lib:"Core", comp:"Menu", region:"component", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:4, ins:750, total:3344 },
  { lib:"Core", comp:"Text field", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:2, ins:433, total:52829 },
  { lib:"Core", comp:"Menu item", region:"component", pattern:"Hack Slot", hack:"Y", q1:"Y",q2:"N",q3:"N",q4:"N", det:9, ins:2294, total:12380 },
  { lib:"Core", comp:"Menu item", region:"content slot", pattern:"Hack Slot", hack:"Y", q1:"N",q2:"N",q3:"N",q4:"N", det:9, ins:2294, total:12380 },
  { lib:"Core", comp:"Button", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"N",q3:"N",q4:"Y", det:37, ins:13603, total:44454 },
  { lib:"Core", comp:"Input control", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:19, ins:9970, total:45983 },
  { lib:"Core", comp:"Search field", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:2, ins:1526, total:9767 },
  { lib:"Core", comp:"Tab group", region:"component", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:2, ins:1772, total:8390 },
  { lib:"Core", comp:"Tab", region:"component", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"N",q4:"Y", det:0, ins:178, total:20658 },
  { lib:"Core", comp:"Tab", region:"Overflow menu variant", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:178, total:20658 },
  { lib:"Core", comp:"Tooltip", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:104, total:942 },
  { lib:"Core", comp:"Content Switcher", region:"component", pattern:"None", hack:"N", q1:"N",q2:"Y",q3:"Y",q4:"Y", det:0, ins:866, total:3450 },
  { lib:"Core", comp:"Content Switcher", region:"control", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:0, ins:866, total:3450 },
  { lib:"Core", comp:"Text area", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:27, total:743 },
  { lib:"Core", comp:"One Time Password", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:79, total:398 },
  { lib:"Greenhouse", comp:"utility/picker", region:null, pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:8, ins:20, total:531 },
  { lib:"Greenhouse", comp:"Modal", region:"content slot", pattern:"Hack slot / Instance swap", hack:"Y", q1:"Y",q2:"Y",q3:"N",q4:"N", det:28, ins:109, total:475 },
  { lib:"Greenhouse", comp:"Date picker", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:10, ins:47, total:430 },
  { lib:"Greenhouse", comp:"Reasoning accordion", region:"expanded > content slot", pattern:"Swap", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:2, ins:10, total:32 },
  { lib:"Greenhouse", comp:"Full-screen modal", region:"content slot", pattern:"Hack Slot", hack:"Y", q1:"N",q2:"N",q3:"N",q4:"N", det:4, ins:24, total:54 },
  { lib:"Greenhouse", comp:"Popover", region:"component", pattern:"Hack Slot", hack:"Y", q1:"N",q2:"Y",q3:"N",q4:"N", det:5, ins:34, total:206 },
  { lib:"Greenhouse", comp:"Side sheet", region:"content slot", pattern:"Hack Slot", hack:"Y", q1:"N",q2:"N",q3:"N",q4:"N", det:11, ins:75, total:87 },
  { lib:"Greenhouse", comp:"Template/Generative", region:"content wrapper", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"N",q4:"N", det:4, ins:33, total:26 },
  { lib:"Greenhouse", comp:"Bottom sheet", region:"content slot", pattern:"Hack Slot", hack:"Y", q1:"N",q2:"N",q3:"N",q4:"N", det:42, ins:478, total:942 },
  { lib:"Greenhouse", comp:"Contextual drawer", region:"content slot", pattern:"Hack Slot", hack:"Y", q1:"N",q2:"N",q3:"N",q4:"N", det:3, ins:36, total:533 },
  { lib:"Greenhouse", comp:"Modal with scrim", region:"content slot", pattern:"Hack slot / Instance swap", hack:"Y", q1:"Y",q2:"Y",q3:"N",q4:"N", det:21, ins:301, total:394 },
  { lib:"Greenhouse", comp:"Table column", region:"(excluding header)", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:13, ins:315, total:3046 },

  { lib:"Greenhouse", comp:"Side navigation", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"N",q4:"N", det:5, ins:240, total:2173 },
  { lib:"Greenhouse", comp:"Dialog", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:2, ins:101, total:691 },
  { lib:"Greenhouse", comp:"Nested table cell", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"N",q3:"N",q4:"N", det:12, ins:715, total:12888 },
  { lib:"Greenhouse", comp:"Progress bar", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:4, ins:289, total:406 },
  { lib:"Greenhouse", comp:"Desktop header", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:3, ins:237, total:426 },
  { lib:"Greenhouse", comp:"Dialog with scrim", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"N", det:2, ins:208, total:260 },
  { lib:"Greenhouse", comp:"Top navigation", region:"middle wrapper > content swap", pattern:"Swap", hack:"Y", q1:"Y",q2:"Y",q3:"N",q4:"Y", det:24, ins:2897, total:4641 },
  { lib:"Greenhouse", comp:"Alert", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"N",q4:"N", det:5, ins:970, total:1695 },
  { lib:"Greenhouse", comp:"Alert", region:"alert icon", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:5, ins:970, total:1695 },
  { lib:"Greenhouse", comp:"Alert", region:"text + cta", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:5, ins:970, total:1695 },
  { lib:"Greenhouse", comp:"Alert", region:"text + cta", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:5, ins:970, total:1695 },
  { lib:"Greenhouse", comp:"Alert", region:"close icon", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:5, ins:970, total:1695 },
  { lib:"Greenhouse", comp:"System response", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:2, ins:725, total:667 },
  { lib:"Greenhouse", comp:"List item", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:10, ins:4559, total:12423 },
  { lib:"Greenhouse", comp:"List item", region:"middle (text)", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"N",q4:"N", det:10, ins:4559, total:12423 },


  { lib:"Greenhouse", comp:"Mobile header", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:2, ins:1569, total:4973 },
  { lib:"Greenhouse", comp:"Table data cell", region:"component", pattern:"None", hack:"N", q1:"N",q2:"Y",q3:"Y",q4:"Y", det:37, ins:75901, total:113498 },
  { lib:"Greenhouse", comp:"Table header cell", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:3, ins:6543, total:12690 },
  { lib:"Greenhouse", comp:"Source/Citation", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:27, total:24 },
  { lib:"Greenhouse", comp:"Inline system message", region:"component", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"N",q4:"N", det:0, ins:99, total:186 },
  { lib:"Greenhouse", comp:"Content card", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"N",q3:"N",q4:"N", det:0, ins:8, total:9 },
  { lib:"Greenhouse", comp:"File group", region:"component", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:0, ins:1, total:6 },

  { lib:"Greenhouse", comp:"Password Checklist", region:"component", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:0, ins:6, total:69 },
  { lib:"Greenhouse", comp:"Filter selection group", region:"options", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"N", det:0, ins:7, total:12 },
  { lib:"Greenhouse", comp:"Message", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:40, total:86 },
  { lib:"Greenhouse", comp:"Status ticker", region:"component", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:0, ins:7, total:10 },
  { lib:"Greenhouse", comp:"Generative/Message composer", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:144, total:257 },
  { lib:"Greenhouse", comp:"File card", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:10, total:9 },
  { lib:"Greenhouse", comp:"User prompt", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:116, total:205 },
  { lib:"Greenhouse", comp:"Deterministic/Message composer", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:3, total:30 },
  { lib:"Greenhouse", comp:"Template/Deterministic", region:"Content wrapper", pattern:"Swap", hack:"N", q1:"N",q2:"N",q3:"N",q4:"N", det:0, ins:7, total:30 },
  { lib:"Greenhouse", comp:"Progress tracker (vertical)", region:"component", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:0, ins:8, total:95 },
  { lib:"Greenhouse", comp:"Progress tracker (horizontal)", region:"component", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:0, ins:91, total:198 },
  { lib:"Greenhouse", comp:"Side sheet with scrim", region:"content slot", pattern:"Hack Slot", hack:"Y", q1:"N",q2:"N",q3:"N",q4:"N", det:0, ins:21, total:72 },
  { lib:"Greenhouse", comp:"Alert notice", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:1646, total:7228 },
  { lib:"Greenhouse", comp:"Breadcrumb", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:1505, total:783 },
  { lib:"Greenhouse", comp:"Selection group / Switch group", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:14, total:13 },
  { lib:"Greenhouse", comp:"Selection group / Switch group", region:"heading", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"N",q4:"N", det:0, ins:14, total:13 },
  { lib:"Greenhouse", comp:"Selection group / Switch group", region:"options", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:0, ins:14, total:13 },
  { lib:"Greenhouse", comp:"Selection group / Radio group", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:15, total:207 },
  { lib:"Greenhouse", comp:"Selection group / Radio group", region:"heading", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"N",q4:"N", det:0, ins:15, total:207 },
  { lib:"Greenhouse", comp:"Selection group / Radio group", region:"component2", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:15, total:207 },
  { lib:"Greenhouse", comp:"Selection group / Checkbox group", region:"heading", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"N",q4:"N", det:0, ins:35, total:15 },
  { lib:"Greenhouse", comp:"Selection group / Checkbox group", region:"options", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:0, ins:35, total:15 },
  { lib:"Greenhouse", comp:"Selection group / Checkbox group", region:"options2", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"Y", det:0, ins:35, total:15 },
  { lib:"Greenhouse", comp:"Selection item", region:"Container", pattern:"None", hack:"Y", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:72, total:185 },
  { lib:"Greenhouse", comp:"Selection item", region:"Container>(control)", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:72, total:185 },
  { lib:"Greenhouse", comp:"Selection item", region:"Container>content", pattern:"Hack Slot", hack:"Y", q1:"N",q2:"N",q3:"N",q4:"Y", det:0, ins:72, total:185 },
  { lib:"Greenhouse", comp:"Selection item", region:"Container>contents>text", pattern:"Swap", hack:"Y", q1:"N",q2:"N",q3:"N",q4:"Y", det:0, ins:72, total:185 },
  { lib:"Greenhouse", comp:"File dropzone", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:39, total:311 },
  { lib:"Greenhouse", comp:"File upload", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:45, total:152 },
  { lib:"Greenhouse", comp:"Phone number field", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:3, total:162 },
  { lib:"Greenhouse", comp:"Nested side navigation item", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:1069, total:11960 },
  { lib:"Greenhouse", comp:"Nested navigation section", region:"Content", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"N", det:0, ins:3, total:239 },
  { lib:"Greenhouse", comp:"utility/custom picker", region:"component", pattern:"Hack Slot", hack:"Y", q1:"N",q2:"N",q3:"N",q4:"N", det:0, ins:1, total:8 },
  { lib:"Greenhouse", comp:"Accordion", region:"content slot", pattern:"Hack Slot", hack:"Y", q1:"N",q2:"N",q3:"N",q4:"N", det:0, ins:69, total:1076 },
  { lib:"Greenhouse", comp:"Source/Link", region:"component", pattern:"None", hack:"N", q1:"N",q2:"N",q3:"Y",q4:"N", det:0, ins:0, total:3 },
  { lib:"Greenhouse", comp:"Pulse indicator", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:0, total:8 },
  { lib:"Greenhouse", comp:"Draggable navigation item", region:"component", pattern:"None", hack:"N", q1:"Y",q2:"Y",q3:"Y",q4:"Y", det:0, ins:0, total:5 },
];

// ── Compute tiers ─────────────────────────────────────────────────────────
function getTier(r) {
  const qs = [r.q1, r.q2, r.q3, r.q4];
  if (qs.some(q => q === null || q === undefined)) return null;
  const yc = qs.filter(q => String(q).toUpperCase() === "Y").length;
  if (yc === 4) return "Not eligible";
  if (yc >= 2) return "Investigate (likely ineligible)";
  if (yc === 1) return "Investigate (possibly eligible)";
  return "Slot candidate";
}

const data = RAW.map(r => ({ ...r, tier: getTier(r), detachRate: r.ins > 0 ? r.det / r.ins : 0 })).filter(r => r.tier !== null);

// ── Display name helper ───────────────────────────────────────────────────
function displayName(r) {
  if (!r.region || r.region === "component" || r.region === "component2") return r.comp;
  return `${r.comp} > ${r.region}`;
}

// ── Color system ──────────────────────────────────────────────────────────
const TIER_COLORS = {
  "Slot candidate": "#0FA573",
  "Investigate (possibly eligible)": "#E8A317",
  "Investigate (likely ineligible)": "#D4652F",
  "Not eligible": "#8B8FA3",
};
const TIER_ORDER = ["Slot candidate", "Investigate (possibly eligible)", "Investigate (likely ineligible)", "Not eligible"];
const LIB_COLORS = { Core: "#5B6AD0", Greenhouse: "#2DA882" };

// ── Panels ────────────────────────────────────────────────────────────────

function SectionLabel({ num, title, subtitle }) {
  return (
    <div style={{ marginBottom: 20, borderBottom: "1px solid #2a2d3a", paddingBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5B6AD0", letterSpacing: 1, fontWeight: 600 }}>{num}</span>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#E8E9ED", letterSpacing: "-0.02em" }}>{title}</h2>
      </div>
      {subtitle && <p style={{ margin: "6px 0 0 0", fontSize: 13, color: "#7A7E91", lineHeight: 1.5, maxWidth: 640 }}>{subtitle}</p>}
    </div>
  );
}

function TierDistribution() {
  const tierCounts = {};
  TIER_ORDER.forEach(t => tierCounts[t] = { core: 0, greenhouse: 0 });
  data.forEach(r => {
    if (r.lib === "Core") tierCounts[r.tier].core++;
    else tierCounts[r.tier].greenhouse++;
  });

  const pieData = TIER_ORDER.map(t => ({
    name: t, value: tierCounts[t].core + tierCounts[t].greenhouse,
    core: tierCounts[t].core, greenhouse: tierCounts[t].greenhouse
  })).filter(d => d.value > 0);

  const barData = TIER_ORDER.map(t => ({
    name: t.replace("Investigate (likely ineligible)", "Investigate (likely)").replace("Investigate (possibly eligible)", "Investigate (possibly)"),
    Core: tierCounts[t].core,
    Greenhouse: tierCounts[t].greenhouse,
    total: tierCounts[t].core + tierCounts[t].greenhouse,
  })).filter(d => d.total > 0);

  const total = data.length;

  const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    if (percent < 0.04) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>{`${(percent * 100).toFixed(0)}%`}</text>;
  };

  return (
    <div>
      <SectionLabel num="01" title="Tier Distribution" subtitle={`${total} regions evaluated across Core and Greenhouse. The outer ring shows overall distribution; the stacked bar breaks it out by library.`} />
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 280px" }}>
          <ResponsiveContainer width={280} height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={120} innerRadius={50} dataKey="value" labelLine={false} label={CustomPieLabel} strokeWidth={2} stroke="#1a1c28">
                {pieData.map((d, i) => <Cell key={i} fill={TIER_COLORS[d.name]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8, paddingLeft: 12 }}>
            {pieData.map(d => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#B0B3C1" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: TIER_COLORS[d.name], flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{d.name}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#7A7E91" }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <p style={{ fontSize: 11, color: "#5B6AD0", fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, letterSpacing: 0.5 }}>BY LIBRARY</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData} layout="vertical" margin={{ left: 140, right: 20, top: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#7A7E91", fontSize: 11 }} axisLine={{ stroke: "#2a2d3a" }} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#B0B3C1", fontSize: 12 }} axisLine={false} tickLine={false} width={140} />
              <Tooltip contentStyle={{ background: "#22243a", border: "1px solid #3a3d52", borderRadius: 6, fontSize: 12, color: "#E8E9ED" }} />
              <Bar dataKey="Core" stackId="a" fill={LIB_COLORS.Core} radius={[0, 0, 0, 0]} />
              <Bar dataKey="Greenhouse" stackId="a" fill={LIB_COLORS.Greenhouse} radius={[0, 4, 4, 0]} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#B0B3C1" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function HackSlotAlignment() {
  const hackRows = data.filter(r => String(r.hack).toUpperCase() === "Y");
  const confirmedTiers = ["Slot candidate", "Investigate (possibly eligible)"];
  const confirmed = hackRows.filter(r => confirmedTiers.includes(r.tier));
  const misaligned = hackRows.filter(r => !confirmedTiers.includes(r.tier));
  const totalHack = hackRows.length;
  const alignedPct = Math.round((confirmed.length / totalHack) * 100);

  const hackByTier = {};
  hackRows.forEach(r => { hackByTier[r.tier] = (hackByTier[r.tier] || 0) + 1; });
  const hackData = TIER_ORDER.map(t => ({ name: t, value: hackByTier[t] || 0 })).filter(d => d.value > 0);

  return (
    <div>
      <SectionLabel num="02" title="Hack Slot → Tier Alignment" subtitle={`Of ${totalHack} existing hack slots, ${alignedPct}% are confirmed by the framework as eligible or likely eligible for native slots. These are your first-movers.`} />
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 260px" }}>
          <ResponsiveContainer width={260} height={260}>
            <PieChart>
              <Pie data={hackData} cx="50%" cy="50%" outerRadius={110} innerRadius={45} dataKey="value" strokeWidth={2} stroke="#1a1c28" label={({ name, percent }) => percent > 0.08 ? `${(percent*100).toFixed(0)}%` : ""} labelLine={false}>
                {hackData.map((d, i) => <Cell key={i} fill={TIER_COLORS[d.name]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          <p style={{ fontSize: 11, color: "#0FA573", fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, marginTop: 0, letterSpacing: 0.5, fontWeight: 600 }}>FIRST MOVERS — {confirmed.length} regions</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {confirmed.map((r, i) => (
              <div key={i} style={{
                background: "#1e2030", borderRadius: 6, padding: "8px 12px",
                borderLeft: `3px solid ${TIER_COLORS[r.tier]}`, fontSize: 12
              }}>
                <div style={{ color: "#E8E9ED", fontWeight: 500 }}>{displayName(r)}</div>
                <div style={{ color: "#7A7E91", fontSize: 11 }}><span style={{ color: TIER_COLORS[r.tier] }}>● {r.tier.split("(")[0].trim()}</span></div>
              </div>
            ))}
          </div>
          {misaligned.length > 0 && (
            <>
              <p style={{ fontSize: 11, color: "#8B8FA3", fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, marginTop: 20, letterSpacing: 0.5, fontWeight: 600 }}>HACK SLOTS TO RECONSIDER — {misaligned.length} regions</p>
              <p style={{ fontSize: 12, color: "#5a5d6e", marginTop: 0, marginBottom: 8, lineHeight: 1.5 }}>These have existing hack slots, but the framework doesn't confirm them as slot-eligible. The workaround may have been premature — investigate whether the component design itself needs rethinking.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {misaligned.map((r, i) => (
                  <div key={i} style={{
                    background: "#1e2030", borderRadius: 6, padding: "8px 12px",
                    borderLeft: `3px solid ${TIER_COLORS[r.tier]}`, fontSize: 12, opacity: 0.7
                  }}>
                    <div style={{ color: "#E8E9ED", fontWeight: 500 }}>{displayName(r)}</div>
                    <div style={{ color: "#7A7E91", fontSize: 11 }}><span style={{ color: TIER_COLORS[r.tier] }}>● {r.tier.split("(")[0].trim()}</span></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function QPatternClustering() {
  const invRows = data.filter(r => r.tier.startsWith("Investigate"));
  const patterns = {};
  invRows.forEach(r => {
    const key = `${r.q1||"—"}${r.q2||"—"}${r.q3||"—"}${r.q4||"—"}`;
    if (!patterns[key]) patterns[key] = { q1: r.q1, q2: r.q2, q3: r.q3, q4: r.q4, count: 0, components: [] };
    patterns[key].count++;
    patterns[key].components.push(displayName(r));
  });

  const sorted = Object.values(patterns).sort((a, b) => b.count - a.count);
  const qLabels = ["Order", "Amount", "Type", "Functionality"];

  return (
    <div>
      <SectionLabel num="03" title="Question-Pattern Clustering" subtitle={`${invRows.length} regions in the Investigate tiers. The dominant pattern (N-N-Y-Y) tells you most ambiguity comes from type + functionality concerns — not order or count. This shapes what kind of steering those components need.`} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.slice(0, 6).map((p, i) => {
          const qs = [p.q1, p.q2, p.q3, p.q4];
          const barWidth = (p.count / sorted[0].count) * 100;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                {qs.map((q, qi) => (
                  <div key={qi} style={{
                    width: 36, height: 28, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                    background: String(q).toUpperCase() === "Y" ? "#D4652F22" : "#0FA57322",
                    border: `1px solid ${String(q).toUpperCase() === "Y" ? "#D4652F55" : "#0FA57355"}`,
                    color: String(q).toUpperCase() === "Y" ? "#D4652F" : "#0FA573",
                    fontSize: 11, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    {String(q).toUpperCase() === "Y" ? "Y" : "N"}
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, position: "relative", height: 28, background: "#1e2030", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${barWidth}%`, background: "linear-gradient(90deg, #5B6AD033, #5B6AD018)", borderRadius: 4 }} />
                <div style={{ position: "relative", display: "flex", alignItems: "center", height: "100%", paddingLeft: 10, gap: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: "#E8E9ED" }}>{p.count}</span>
                  <span style={{ fontSize: 11, color: "#7A7E91", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.components.slice(0, 3).join(", ")}{p.components.length > 3 ? ` +${p.components.length - 3}` : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
          {qLabels.map((l, i) => (
            <div key={i} style={{ width: 36, textAlign: "center", fontSize: 9, color: "#5B6AD0", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.3, fontWeight: 500 }}>
              Q{i + 1}
            </div>
          ))}
          <div style={{ flex: 1, paddingLeft: 12, fontSize: 9, color: "#5B6AD0", fontFamily: "'JetBrains Mono', monospace" }}>
            Q1: Order · Q2: Amount · Q3: Type · Q4: Functionality
          </div>
        </div>
      </div>
    </div>
  );
}

function DetachVsTier() {
  const scatterData = data
    .filter(r => r.ins > 10)
    .map(r => ({
      name: displayName(r),
      detachRate: Math.round(r.detachRate * 1000) / 10,
      inserts: r.ins,
      tier: r.tier,
      lib: r.lib,
      fill: TIER_COLORS[r.tier],
    }));

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;
    return <circle cx={cx} cy={cy} r={payload.lib === "Core" ? 6 : 5} fill={payload.fill} stroke="#1a1c28" strokeWidth={1.5} opacity={0.85} />;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.[0]) return null;
    const d = payload[0].payload;
    return (
      <div style={{ background: "#22243a", border: "1px solid #3a3d52", borderRadius: 6, padding: "8px 12px", fontSize: 12 }}>
        <div style={{ color: "#E8E9ED", fontWeight: 600 }}>{d.name}</div>
        <div style={{ color: "#7A7E91", marginTop: 2 }}>{d.lib} · {d.tier}</div>
        <div style={{ color: "#B0B3C1", marginTop: 4 }}>Detach rate: {d.detachRate}% · Inserts: {d.inserts.toLocaleString()}</div>
      </div>
    );
  };

  return (
    <div>
      <SectionLabel num="04" title="Detach Rate vs. Usage Volume" subtitle="High detach + slot candidate = native slot is the right fix. High detach + not eligible = the component design itself may need rethinking, not a slot." />
      <ResponsiveContainer width="100%" height={340}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" />
          <XAxis dataKey="inserts" type="number" scale="log" domain={[10, "auto"]} tick={{ fill: "#7A7E91", fontSize: 11 }} axisLine={{ stroke: "#2a2d3a" }} name="Inserts (30d)" label={{ value: "Inserts (30d, log)", position: "bottom", offset: 2, style: { fill: "#5B6AD0", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" } }} />
          <YAxis dataKey="detachRate" type="number" tick={{ fill: "#7A7E91", fontSize: 11 }} axisLine={{ stroke: "#2a2d3a" }} name="Detach %" unit="%" label={{ value: "Detach rate %", angle: -90, position: "insideLeft", offset: 4, style: { fill: "#5B6AD0", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" } }} />
          <Tooltip content={<CustomTooltip />} />
          <Scatter data={scatterData} shape={<CustomDot />} />
        </ScatterChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
        {TIER_ORDER.map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#7A7E91" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: TIER_COLORS[t] }} />
            {t.split("(")[0].trim()}
          </div>
        ))}
      </div>
    </div>
  );
}

function InstanceVolumeAtRisk() {
  // Dedup by parent component — assign to most actionable tier
  const tierPriority = { "Slot candidate": 0, "Investigate (possibly eligible)": 1, "Investigate (likely ineligible)": 2, "Not eligible": 3 };
  const compBest = {};
  data.forEach(r => {
    const key = `${r.lib}::${r.comp}`;
    if (!compBest[key] || tierPriority[r.tier] < tierPriority[compBest[key].tier]) {
      compBest[key] = { tier: r.tier, total: r.total };
    }
  });
  const tierInstances = {};
  Object.values(compBest).forEach(({ tier, total }) => {
    tierInstances[tier] = (tierInstances[tier] || 0) + total;
  });

  const barData = TIER_ORDER.map(t => ({
    name: t.replace("Investigate (likely ineligible)", "Investigate\n(likely)").replace("Investigate (possibly eligible)", "Investigate\n(possibly)"),
    fullName: t,
    instances: tierInstances[t] || 0,
    fill: TIER_COLORS[t],
  }));

  const totalActionable = (tierInstances["Slot candidate"] || 0) + (tierInstances["Investigate (possibly eligible)"] || 0) + (tierInstances["Investigate (likely ineligible)"] || 0);
  const grandTotal = Object.values(tierInstances).reduce((a, b) => a + b, 0);

  return (
    <div>
      <SectionLabel num="05" title="Instance Volume at Risk" subtitle={`${totalActionable.toLocaleString()} instances (${Math.round(totalActionable/grandTotal*100)}% of total) sit in tiers that need action — investigation or native slot migration. The Investigate tier alone covers ${(tierInstances["Investigate (likely ineligible)"] || 0).toLocaleString()} instances.`} />
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={barData} margin={{ top: 20, right: 20, bottom: 4, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#B0B3C1", fontSize: 11 }} axisLine={{ stroke: "#2a2d3a" }} tickLine={false} interval={0} />
          <YAxis tick={{ fill: "#7A7E91", fontSize: 11 }} axisLine={{ stroke: "#2a2d3a" }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v} />
          <Tooltip contentStyle={{ background: "#22243a", border: "1px solid #3a3d52", borderRadius: 6, fontSize: 12, color: "#E8E9ED" }} formatter={(v) => v.toLocaleString()} />
          <Bar dataKey="instances" radius={[4, 4, 0, 0]}>
            {barData.map((d, i) => <Cell key={i} fill={d.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function DataTable() {
  const [sortKey, setSortKey] = useState("tier");
  const [filterTier, setFilterTier] = useState("all");
  const [filterLib, setFilterLib] = useState("all");

  const tierSortOrder = { "Slot candidate": 0, "Investigate (possibly eligible)": 1, "Investigate (likely ineligible)": 2, "Not eligible": 3 };

  let filtered = data.filter(r => {
    if (filterTier !== "all" && r.tier !== filterTier) return false;
    if (filterLib !== "all" && r.lib !== filterLib) return false;
    return true;
  });

  filtered.sort((a, b) => {
    if (sortKey === "tier") return (tierSortOrder[a.tier] ?? 5) - (tierSortOrder[b.tier] ?? 5);
    if (sortKey === "detach") return b.detachRate - a.detachRate;
    if (sortKey === "inserts") return b.ins - a.ins;
    if (sortKey === "total") return b.total - a.total;
    return 0;
  });

  const selectStyle = {
    background: "#1e2030", border: "1px solid #2a2d3a", borderRadius: 4, color: "#B0B3C1",
    padding: "4px 8px", fontSize: 12, outline: "none", cursor: "pointer"
  };

  return (
    <div>
      <SectionLabel num="06" title="Full Audit Table" subtitle="Sortable and filterable. Use this to explore individual regions and their evaluation details." />
      <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <select value={filterTier} onChange={e => setFilterTier(e.target.value)} style={selectStyle}>
          <option value="all">All tiers</option>
          {TIER_ORDER.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterLib} onChange={e => setFilterLib(e.target.value)} style={selectStyle}>
          <option value="all">All libraries</option>
          <option value="Core">Core</option>
          <option value="Greenhouse">Greenhouse</option>
        </select>
        <select value={sortKey} onChange={e => setSortKey(e.target.value)} style={selectStyle}>
          <option value="tier">Sort: Tier priority</option>
          <option value="detach">Sort: Detach rate</option>
          <option value="inserts">Sort: Inserts (30d)</option>
          <option value="total">Sort: Total instances</option>
        </select>
        <span style={{ fontSize: 11, color: "#5B6AD0", alignSelf: "center", fontFamily: "'JetBrains Mono', monospace" }}>{filtered.length} regions</span>
      </div>
      <div style={{ maxHeight: 400, overflowY: "auto", borderRadius: 6, border: "1px solid #2a2d3a" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead style={{ position: "sticky", top: 0, background: "#1e2030", zIndex: 1 }}>
            <tr>
              {["Lib", "Component", "Q1", "Q2", "Q3", "Q4", "Tier", "Hack?", "Detach%", "Ins(30d)", "Total"].map(h => (
                <th key={h} style={{ padding: "8px 6px", textAlign: "left", color: "#5B6AD0", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, borderBottom: "1px solid #2a2d3a", letterSpacing: 0.5, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #1e2030", background: i % 2 === 0 ? "transparent" : "#1a1c2808" }}>
                <td style={{ padding: "6px", color: LIB_COLORS[r.lib], fontWeight: 500 }}>{r.lib === "Core" ? "C" : "GH"}</td>
                <td style={{ padding: "6px", color: "#E8E9ED" }}>{displayName(r)}</td>
                {[r.q1, r.q2, r.q3, r.q4].map((q, qi) => (
                  <td key={qi} style={{ padding: "6px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: q === null ? "#3a3d52" : String(q).toUpperCase() === "Y" ? "#D4652F" : "#0FA573", fontWeight: 600 }}>
                    {q === null ? "—" : String(q).toUpperCase()}
                  </td>
                ))}
                <td style={{ padding: "6px" }}>
                  <span style={{
                    display: "inline-block", padding: "2px 6px", borderRadius: 3, fontSize: 10, fontWeight: 600,
                    background: TIER_COLORS[r.tier] + "22", color: TIER_COLORS[r.tier], whiteSpace: "nowrap"
                  }}>
                    {r.tier === "Investigate (likely ineligible)" ? "Inv. (likely)" : r.tier === "Investigate (possibly eligible)" ? "Inv. (possibly)" : r.tier}
                  </span>
                </td>
                <td style={{ padding: "6px", color: String(r.hack).toUpperCase() === "Y" ? "#E8A317" : "#3a3d52", fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>
                  {String(r.hack).toUpperCase() === "Y" ? "●" : "—"}
                </td>
                <td style={{ padding: "6px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: r.detachRate > 0.1 ? "#D4652F" : "#B0B3C1" }}>
                  {r.ins > 0 ? `${(r.detachRate * 100).toFixed(1)}%` : "—"}
                </td>
                <td style={{ padding: "6px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#B0B3C1" }}>{r.ins.toLocaleString()}</td>
                <td style={{ padding: "6px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#B0B3C1" }}>{r.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────
export default function SlotAuditDashboard() {
  return (
    <div style={{
      minHeight: "100vh", background: "#14151F", color: "#E8E9ED",
      fontFamily: "'DM Sans', -apple-system, sans-serif", padding: "32px 28px"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <header style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#5B6AD0", letterSpacing: 1.5, fontWeight: 600, textTransform: "uppercase" }}>Unify Design System</span>
          <span style={{ width: 1, height: 12, background: "#2a2d3a" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#7A7E91", letterSpacing: 1 }}>Slots Pre-Release Audit</span>
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", color: "#E8E9ED" }}>
          Native Slot Eligibility Analysis
        </h1>
        <p style={{ margin: "8px 0 0 0", fontSize: 14, color: "#7A7E91", lineHeight: 1.6, maxWidth: 720 }}>
          101 regions across 2 libraries evaluated against the Essential Function Test (4 unevaluated regions excluded).
          This dashboard visualizes what needs native slots, what needs investigation, and why the rollout should follow a specific order.
        </p>

        <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
          {[
            { label: "Slot candidates", value: "16", color: TIER_COLORS["Slot candidate"] },
            { label: "Needs investigation", value: "38", color: TIER_COLORS["Investigate (likely ineligible)"] },
            { label: "Not eligible", value: "43", color: TIER_COLORS["Not eligible"] },
            { label: "Existing hack slots", value: "17", color: "#E8A317" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#1e2030", borderRadius: 8, padding: "12px 16px", borderTop: `2px solid ${s.color}`, minWidth: 120 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#7A7E91", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        <TierDistribution />
        <HackSlotAlignment />
        <QPatternClustering />
        <DetachVsTier />
        <InstanceVolumeAtRisk />
        <DataTable />
      </div>

      <footer style={{ marginTop: 48, paddingTop: 16, borderTop: "1px solid #2a2d3a", fontSize: 11, color: "#3a3d52" }}>
        Data source: Figma analytics (30-day window) · Framework: Slot Eligibility & Steering Decision Framework v1
      </footer>
    </div>
  );
}
