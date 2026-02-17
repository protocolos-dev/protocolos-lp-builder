"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface OfferSectionProps {
  heading: string;
  protocolHeading: string;
  protocolValueTotal: string;
  bonusesHeading: string;
  bonusBadge: string;
  bonusSubheading: string;
  bonusValueTotal: string;
  bonusValueFree: string;
  bonusExpiry: string;
  totalValueHeading: string;
  totalValue: string;
  subscribePrice: string;
  subscribePricePerDay: string;
  savingsAmount: string;
  savingsPercent: string;
  compareHeading: string;
  compareSubheading: string;
  chooseHeading: string;
  subscribeHeading: string;
  subscribeBadge: string;
  subscribeNoCommitment: string;
  subscribeCheckoutUrl: string;
  subscribeCtaText: string;
  oneTimeHeading: string;
  oneTimeCheckoutUrl: string;
  oneTimeCtaText: string;
  bumpHeading: string;
  bumpSubheading: string;
  bumpDescription: string;
  bumpImageUrl: string;
  bumpUnitPrice: number;
  bumpOriginalPrice: number;
  bumpCheckoutUrl: string;
  countdownWarning: string;
}

export const OfferSection = ({
  heading,
  protocolHeading,
  protocolValueTotal,
  bonusesHeading,
  bonusBadge,
  bonusSubheading,
  bonusValueTotal,
  bonusValueFree,
  bonusExpiry,
  totalValueHeading,
  totalValue,
  subscribePrice,
  subscribePricePerDay,
  savingsAmount,
  savingsPercent,
  compareHeading,
  compareSubheading,
  chooseHeading,
  subscribeHeading,
  subscribeBadge,
  subscribeNoCommitment,
  subscribeCheckoutUrl,
  subscribeCtaText,
  oneTimeHeading,
  oneTimeCheckoutUrl,
  oneTimeCtaText,
  bumpHeading,
  bumpSubheading,
  bumpDescription,
  bumpImageUrl,
  bumpUnitPrice,
  bumpOriginalPrice,
  bumpCheckoutUrl,
  countdownWarning,
}: OfferSectionProps) => {
  const [hours, setHours] = useState("06");
  const [minutes, setMinutes] = useState("42");
  const [seconds, setSeconds] = useState("18");
  const [subQty, setSubQty] = useState(2);
  const [oneTimeQty, setOneTimeQty] = useState(0);
  const [bumpAdded, setBumpAdded] = useState(false);
  const [bumpQty, setBumpQty] = useState(1);

  const handleBumpToggle = () => {
    const next = !bumpAdded;
    setBumpAdded(next);
    toast(next ? "✅ D3+K2 added" : "❌ D3+K2 removed", { duration: 2000 });
  };
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      setHours(String(Math.floor(diff / 3600000)).padStart(2, "0"));
      setMinutes(String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"));
      setSeconds(String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-surface-blue-light py-16 px-5" id="order">
      <div className="container">
        <h2 className="text-2xl md:text-[2.2rem] leading-tight font-bold text-center mb-10 text-foreground font-heading">
          {heading}
        </h2>

        {/* Product Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {[
            { label: "PHASE 1", img: "https://placehold.co/300x400/png?text=Phase+1", desc: "Detox Zee Herbal", sub: "Days 1-30 · Digestive Wellness", bg: "bg-[hsl(180,60%,95%)]", border: "border-primary/30", badge: "bg-primary", dashed: "border-primary/40" },
            { label: "PHASE 2", img: "https://placehold.co/300x400/png?text=Phase+2", desc: "PottyWise", sub: "Days 31-60 · Regularity Support", bg: "bg-surface-green-light", border: "border-secondary/30", badge: "bg-secondary", dashed: "border-secondary/40" },
            { label: "PHASE 3", img: "https://placehold.co/300x400/png?text=Phase+3", desc: "Hungry Hero", sub: "Days 61-90 · Appetite & Metabolism", bg: "bg-surface-orange-light", border: "border-accent/30", badge: "bg-accent", dashed: "border-accent/40" },
          ].map((phase) => (
            <div key={phase.label} className={`${phase.bg} rounded-2xl border ${phase.border} p-6 flex flex-col items-center relative pt-10`}>
              <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 ${phase.badge} text-primary-foreground px-5 py-1.5 rounded-full text-sm font-bold shadow-sm`}>
                {phase.label}
              </span>
              <div className={`border-2 border-dashed ${phase.dashed} rounded-xl p-4 mb-4 w-full flex items-center justify-center bg-white aspect-square`}>
                <img src={phase.img} alt={phase.desc} className="max-h-full max-w-full object-contain" />
              </div>
              <p className="font-semibold text-foreground text-center">{phase.desc}</p>
              <p className="text-sm text-muted-foreground">{phase.sub}</p>
            </div>
          ))}
        </div>

        {/* Protocol Value Box */}
        <div className="max-w-[900px] mx-auto mb-10 -mx-5 md:mx-auto">
          <div className="bg-card p-4 md:p-10 rounded-none md:rounded-2xl shadow-md border border-secondary/20">
            <h3 className="text-foreground text-center text-2xl md:text-3xl font-bold mb-6 font-heading">
              {protocolHeading}
            </h3>
            <ul className="space-y-3 text-lg">
              {[
                ["Phase 1:", "Detox Zee Herbal — Digestive Wellness (30-day)", "$34.99"],
                ["Phase 2:", "PottyWise — Regularity Support (30-day)", "$29.99"],
                ["Phase 3:", "Hungry Hero — Appetite & Metabolism (60 servings)", "$45.99"],
              ].map(([phase, desc, price]) => (
                <li key={phase} className="bg-surface-green-light px-5 py-4 rounded-xl flex justify-between text-foreground border border-secondary/10">
                  <span><strong>✓ {phase}</strong> {desc}</span>
                  <span className="font-bold">{price}</span>
                </li>
              ))}
            </ul>
            <div className="border-t-2 border-border mt-6 pt-5">
              <p className="text-center text-2xl font-bold text-foreground">Protocol Value: {protocolValueTotal}</p>
            </div>
          </div>
        </div>

        {/* Bonuses */}
        <div className="max-w-[900px] mx-auto mb-10 -mx-5 md:mx-auto">
          <div className="bg-brand-pink-100 p-4 md:p-10 rounded-none md:rounded-t-2xl text-center border border-accent/20 border-b-0 pt-12 md:pt-10 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold text-accent-foreground shadow-sm animate-pulse whitespace-nowrap max-w-[90%] truncate">
              {bonusBadge}
            </div>
            <h3 className="text-foreground text-2xl md:text-3xl font-bold font-heading mt-4 md:mt-2">
              {bonusesHeading}
            </h3>
            <p className="text-muted-foreground text-lg mt-2" dangerouslySetInnerHTML={{ __html: bonusSubheading }} />
          </div>

          <div className="space-y-0">
            {[
              {
                icon: "📊",
                title: "The 90-Day Transformation Tracker",
                desc: 'Week-by-week guidance on what to expect, what to watch for, and how to support each phase. Never wonder "is this working?" again!',
                value: 47,
                benefit: "Know exactly what to look for each week",
                color: "primary",
                bgColor: "bg-surface-blue-light",
              },
              {
                icon: "🎨",
                title: '"My Tummy Feels Good" Interactive Coloring Book',
                desc: "12-page downloadable coloring book that helps kids understand their digestive journey in a fun, age-appropriate way. Includes stickers and progress charts!",
                value: 19,
                benefit: "Kids actually enjoy the process",
                color: "secondary",
                bgColor: "bg-surface-green-light",
              },
              {
                icon: "📧",
                title: "Email Support Sequence",
                desc: "7 expertly-timed emails at each phase transition with tips, troubleshooting, and encouragement. Like having a gut health coach in your inbox!",
                value: 97,
                benefit: "Never feel lost or unsupported",
                color: "accent",
                bgColor: "bg-brand-pink-100",
              },
            ].map((bonus, i) => (
              <div key={i} className={`bg-card p-4 md:p-8 border border-border/60 border-t-0 first:border-t ${i === 2 ? "rounded-none md:rounded-b-2xl" : ""}`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Icon + Content */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-14 h-14 ${bonus.bgColor} rounded-xl flex items-center justify-center text-3xl shrink-0`}>
                      {bonus.icon}
                    </div>
                    <div className="flex-1">
                      <strong className="text-lg text-foreground block">🎁 BONUS #{i + 1}: {bonus.title}</strong>
                      <p className={`text-sm font-bold mt-1 ${
                        bonus.color === "primary" ? "text-primary" :
                        bonus.color === "secondary" ? "text-secondary" : "text-accent"
                      }`}>
                        → {bonus.benefit}
                      </p>
                      <p className="text-muted-foreground mt-2 leading-relaxed text-sm">{bonus.desc}</p>
                    </div>
                  </div>
                  {/* Price badge — bigger & clearer */}
                  <div className="shrink-0 text-center sm:text-right flex flex-row-reverse sm:flex-col items-center sm:items-end gap-2 sm:gap-1 w-full sm:w-auto justify-center">
                    <span className="text-muted-foreground line-through text-base font-medium">${bonus.value} value</span>
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${
                      bonus.color === "primary" ? "bg-primary text-primary-foreground" :
                      bonus.color === "secondary" ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground"
                    }`}>
                      FREE TODAY
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bonus Stack Summary — bigger */}
          <div className="cta-gradient rounded-none md:rounded-2xl p-4 md:p-8 mt-5 text-center shadow-lg">
            <p className="text-primary-foreground text-xl md:text-2xl font-bold">
              🎁 Total Bonus Value: <span className="line-through opacity-80">{bonusValueTotal}</span>
            </p>
            <p className="text-primary-foreground text-3xl md:text-4xl font-black mt-2">
              {bonusValueFree}
            </p>
            <p className="text-primary-foreground/80 text-sm mt-2">{bonusExpiry}</p>
          </div>
        </div>

        {/* Value Breakdown — BIG & BOLD */}
        <div className="max-w-[900px] mx-auto bg-card rounded-none md:rounded-2xl border-2 border-primary/25 shadow-xl relative mb-12 overflow-hidden -mx-5 md:mx-auto">
          <div className="bg-primary text-primary-foreground text-center py-4 px-4 md:px-6">
            <p className="text-lg md:text-2xl font-bold tracking-wide">{totalValueHeading}</p>
          </div>

          <div className="p-4 md:p-10">
            {/* Line items */}
            <div className="space-y-3">
              {[
                { label: "✓ Phase 1: Detox Zee Herbal (30-day supply)", value: "$34.99" },
                { label: "✓ Phase 2: PottyWise (30-day supply)", value: "$29.99" },
                { label: "✓ Phase 3: Hungry Hero (60 servings)", value: "$45.99" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 px-5 bg-surface-blue-light rounded-xl border border-primary/10">
                  <span className="text-foreground text-base md:text-lg font-medium">{item.label}</span>
                  <span className="text-primary text-lg md:text-xl font-bold shrink-0 ml-4">{item.value}</span>
                </div>
              ))}
              {[
                { label: "🎁 BONUS: 90-Day Transformation Tracker", value: "$47.00" },
                { label: '🎁 BONUS: "Tummy Feels Good" Coloring Book', value: "$19.00" },
                { label: "🎁 BONUS: Email Support Sequence (7 emails)", value: "$97.00" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 px-5 bg-surface-green-light rounded-xl border border-secondary/10">
                  <span className="text-foreground text-base md:text-lg font-medium">{item.label}</span>
                  <span className="text-secondary text-lg md:text-xl font-bold shrink-0 ml-4">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Total value */}
            <div className="border-t-2 border-dashed border-border mt-6 pt-6">
              <div className="flex justify-between items-center px-5">
                <span className="text-foreground text-xl md:text-2xl font-bold">Total Value:</span>
                <span className="text-foreground text-3xl md:text-4xl font-black line-through decoration-accent decoration-[3px]">{totalValue}</span>
              </div>
            </div>

            {/* Your price */}
            <div className="cta-gradient p-8 rounded-2xl mt-6 shadow-lg text-center">
              <p className="text-primary-foreground text-lg font-semibold opacity-95 uppercase tracking-wide">You Pay Today:</p>
              <p className="text-primary-foreground text-5xl md:text-6xl font-black mt-2 mb-1">{subscribePrice}</p>
              <p className="text-primary-foreground/80 text-base">{subscribePricePerDay}</p>
            </div>

            {/* Savings callout */}
            <div className="mt-6 p-6 bg-brand-pink-100 rounded-2xl border-2 border-accent/25 text-center">
              <p className="text-accent text-3xl md:text-4xl font-black">💰 YOU SAVE {savingsAmount}</p>
              <p className="text-foreground text-lg font-semibold mt-2">That's <span className="text-accent font-black text-2xl">{savingsPercent}</span> the total value</p>
              <p className="text-muted-foreground text-sm mt-1">+ Free shipping on subscriptions</p>
            </div>
          </div>
        </div>

        {/* Pricing Comparison Table */}
        <div className="max-w-4xl mx-auto mt-16 mb-16">
          <h2 className="text-foreground text-center text-2xl md:text-3xl font-bold mb-3 font-heading">{compareHeading}</h2>
          <p className="text-muted-foreground text-center text-lg mb-8">{compareSubheading}</p>

          <div className="bg-card rounded-none md:rounded-2xl overflow-hidden shadow-lg border border-border -mx-5 md:mx-0">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_1fr_1.5fr] md:grid-cols-3">
              <div className="bg-primary p-4 md:p-5 text-primary-foreground font-bold text-center text-base md:text-lg">Quantity</div>
              <div className="bg-primary p-4 md:p-5 text-primary-foreground font-bold text-center text-base md:text-lg border-l border-primary-foreground/20">One-Time</div>
              <div className="cta-gradient p-4 md:p-5 text-primary-foreground font-bold text-center text-base md:text-lg">
                Subscribe & Save ✓
              </div>
            </div>

            {/* Table Rows */}
            {[
              { qty: "1 Pack", label: "Starter", oneTime: "$99.87", sub: "$83.23", pct: "25% OFF", badge: null, highlight: false },
              { qty: "2 Packs", label: "Most Popular", oneTime: "$199.75", sub: "$155.36", pct: "30% OFF", badge: "⭐ MOST POPULAR", highlight: true },
              { qty: "3 Packs", label: "Families", oneTime: "$299.62", sub: "$216.39", pct: "35% OFF", badge: null, highlight: false },
              { qty: "5 Packs", label: "Best Value", oneTime: "$499.36", sub: "$332.91", pct: "40% OFF", badge: "🏆 BEST VALUE", highlight: false },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-[1fr_1fr_1.5fr] md:grid-cols-3 border-t border-border ${row.highlight ? "bg-surface-green-light/40" : ""}`}>
                {/* Quantity */}
                <div className="p-4 md:p-5 flex flex-col items-center justify-center">
                  <span className="font-bold text-foreground text-base md:text-lg">{row.qty}</span>
                  <span className="text-xs text-muted-foreground">{row.label}</span>
                </div>

                {/* One-Time Price */}
                <div className="p-4 md:p-5 flex items-center justify-center border-l border-border">
                  <span className="text-lg md:text-xl font-bold text-muted-foreground">{row.oneTime}</span>
                </div>

                {/* Subscribe Price */}
                <div className="p-4 md:p-5 flex flex-col items-center justify-center gap-1.5 relative border-l border-border">
                  {row.badge && (
                    <span className="bg-accent text-accent-foreground px-3 py-0.5 rounded-full text-[11px] font-bold shadow-sm whitespace-nowrap">
                      {row.badge}
                    </span>
                  )}
                  <span className="text-xl md:text-2xl font-black text-secondary">{row.sub}</span>
                  <span className="text-xs font-bold text-secondary bg-secondary/15 px-3 py-0.5 rounded-full whitespace-nowrap">{row.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========== CHOOSE YOUR OPTION ========== */}
        <h2 id="choose-option" className="text-foreground text-center text-2xl md:text-3xl font-bold mb-10 font-heading">{chooseHeading}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start -mx-5 md:mx-auto px-0 md:px-0 [&_a]:box-border">

          {/* ---- Subscribe & Save (Primary) ---- */}
          <div className="bg-card p-4 md:p-10 rounded-none md:rounded-2xl relative border-2 border-secondary shadow-xl md:scale-[1.03]">
            <div className="bg-secondary text-secondary-foreground text-center py-2.5 px-4 rounded-none md:rounded-t-xl -mx-4 md:-mx-10 -mt-4 md:-mt-10 mb-6 font-bold text-sm tracking-wide">
              {subscribeBadge}
            </div>

            <h3 className="mb-4 text-2xl font-bold text-center font-heading text-foreground">{subscribeHeading}</h3>

            <div className="bg-surface-green-light border border-secondary/20 p-3 rounded-xl mb-6 text-center">
              <p className="font-bold text-secondary" dangerouslySetInnerHTML={{ __html: subscribeNoCommitment }} />
              <p className="text-sm text-muted-foreground mt-0.5">Pause or cancel with one click. Lock in your discount forever.</p>
            </div>

            {/* Price Stack */}
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground line-through">If bought separately: $273.97</p>
              <p className="text-sm text-muted-foreground">Regular price: $110.97</p>
              <div className="cta-gradient rounded-xl p-5 mt-3">
                <p className="text-sm font-bold text-primary-foreground uppercase tracking-wide opacity-90">Your Price Today:</p>
                <p className="text-5xl font-black text-primary-foreground my-1">$83.23</p>
                <p className="text-sm text-primary-foreground/80 italic">per pack · saves you $27.74</p>
              </div>
            </div>

            {/* Quantity Cards */}
            <div className="space-y-2 mb-6">
              <p className="text-xs font-bold text-center text-muted-foreground uppercase tracking-wider mb-3">Select Your Quantity:</p>
              {[
                { label: "1 Pack", price: "$83.23", discount: "25% OFF", qty: 1, badge: null, badgeStyle: "" },
                { label: "2 Packs", price: "$155.36", discount: "30% OFF", qty: 2, badge: "⭐ MOST POPULAR", badgeStyle: "bg-accent text-accent-foreground" },
                { label: "3 Packs", price: "$216.39", discount: "35% OFF", qty: 3, badge: null, badgeStyle: "" },
                { label: "5 Packs", price: "$332.91", discount: "40% OFF", qty: 5, badge: "🏆 BEST VALUE", badgeStyle: "bg-accent text-accent-foreground" },
              ].map((opt) => {
                const isSelected = subQty === opt.qty;
                return (
                <label
                  key={opt.qty}
                  onClick={() => setSubQty(opt.qty)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-secondary bg-surface-green-light shadow-md"
                      : "border-border bg-card hover:border-secondary/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? "border-secondary" : "border-muted-foreground/30"
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-secondary" />}
                    </div>
                    <span className="font-bold text-foreground whitespace-nowrap">{opt.label}</span>
                    {opt.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold whitespace-nowrap ${opt.badgeStyle}`}>{opt.badge}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-secondary text-lg">{opt.price}</span>
                    <span className="block text-xs text-secondary font-semibold">{opt.discount}</span>
                  </div>
                </label>
                );
              })}
            </div>

            {/* Benefits */}
            <ul className="space-y-2 mb-6 text-sm">
              {[
                <><strong>Cancel or pause anytime</strong> — No questions asked</>,
                "Lock in lifetime price (increasing to $97 next month)",
                "Free shipping on every order",
                "Priority customer support (skip the line)",
                "First access to new protocol launches",
                "Automatic seasonal wellness maintenance",
              ].map((item, i) => (
                <li key={i} className="pl-6 relative text-foreground">
                  <span className="absolute left-0 text-secondary font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={subscribeCheckoutUrl}
              className="block w-full cta-gradient text-center py-4 rounded-full text-primary-foreground font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 animate-pulse-glow [-webkit-appearance:none] box-border"
            >
              {subscribeCtaText}
            </a>
            <p className="text-center mt-3 text-xs text-muted-foreground">That's just $0.92/day for your child's wellness</p>
          </div>

          {/* ---- One-Time Purchase (Secondary) ---- */}
          <div className="bg-card p-4 md:p-10 rounded-none md:rounded-2xl shadow-md border border-border">
            <h3 className="mb-4 text-2xl font-bold text-center font-heading text-foreground">{oneTimeHeading}</h3>

            {/* Price Stack */}
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground line-through">If bought separately: $273.97</p>
              <p className="text-sm text-muted-foreground">Regular price: $110.97</p>
              <div className="bg-surface-blue-light border border-primary/20 rounded-xl p-5 mt-3">
                <p className="text-sm font-bold text-primary uppercase tracking-wide">Your Price Today:</p>
                <p className="text-5xl font-black text-primary my-1">$99.87</p>
                <p className="text-sm text-muted-foreground italic">per pack · saves you $11.10</p>
              </div>
            </div>

            {/* Quantity Cards */}
            <div className="space-y-2 mb-6">
              <p className="text-xs font-bold text-center text-muted-foreground uppercase tracking-wider mb-3">Select Your Quantity:</p>
              {[
                { label: "1 Pack", price: "$99.87", discount: "10% OFF", qty: 1 },
                { label: "2 Packs", price: "$199.75", discount: "10% OFF", qty: 2 },
                { label: "3 Packs", price: "$299.62", discount: "10% OFF", qty: 3 },
                { label: "5 Packs", price: "$499.36", discount: "10% OFF", qty: 5 },
              ].map((opt) => {
                const isSelected = oneTimeQty === opt.qty;
                return (
                <label
                  key={opt.qty}
                  onClick={() => setOneTimeQty(opt.qty)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-surface-blue-light shadow-md"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? "border-primary" : "border-muted-foreground/30"
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <span className="font-bold text-foreground">{opt.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-primary text-lg">{opt.price}</span>
                    <span className="block text-xs text-primary font-semibold">{opt.discount}</span>
                  </div>
                </label>
                );
              })}
            </div>

            {/* Benefits */}
            <ul className="space-y-2 mb-6 text-sm">
              {[
                "Complete 90-day program",
                "All 3 phases included",
                "All bonuses included",
                "30-day guarantee",
                "Free shipping over $50",
                "No commitment required",
              ].map((item, i) => (
                <li key={i} className="pl-6 relative text-foreground">
                  <span className="absolute left-0 text-primary font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={oneTimeCheckoutUrl}
              className="block w-full bg-primary text-center py-4 rounded-full text-primary-foreground font-bold text-lg shadow-md hover:shadow-lg hover:opacity-90 transition-all"
            >
              {oneTimeCtaText}
            </a>
            <p className="text-center mt-3 text-xs text-muted-foreground">$1.11/day for 90 days</p>
          </div>
        </div>

        {/* Order Bump */}
        <div className="max-w-4xl mx-auto mt-16 -mx-5 md:mx-auto">
          <div className="bg-accent/10 border-2 border-dashed border-accent rounded-none md:rounded-2xl overflow-hidden">
            {/* Bump Header - clickable */}
            <label className="flex flex-col bg-accent text-accent-foreground p-4 md:p-5 cursor-pointer hover:bg-accent/90 transition-colors group" onClick={handleBumpToggle}>
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 shrink-0">
                  <div className={`w-8 h-8 rounded border-[3px] border-white transition-all ${bumpAdded ? 'bg-white' : 'bg-transparent'}`} />
                  {bumpAdded && <svg className="absolute inset-0 w-8 h-8 pointer-events-none text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>}
                  {!bumpAdded && <>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-[hsl(50,100%,60%)] rounded-full animate-ping" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-[hsl(50,100%,60%)] rounded-full" />
                  </>}
                </div>
                <p className="font-extrabold text-base md:text-2xl tracking-tight flex-1">{bumpHeading}</p>
                <div className="text-right shrink-0">
                  <p className="line-through text-sm md:text-lg font-semibold opacity-80">${(bumpOriginalPrice * bumpQty).toFixed(2)}</p>
                  <p className="text-2xl md:text-3xl font-black">${(bumpUnitPrice * bumpQty).toFixed(2)}</p>
                </div>
              </div>
              <p className="text-xs md:text-sm opacity-90 mt-1.5 pl-11">{bumpSubheading}</p>
            </label>

            {/* Bump Body */}
            <div className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Product Image */}
                <div className="shrink-0 md:w-40">
                  <img src={bumpImageUrl} alt="Order Bump Product" className="w-36 md:w-40 mx-auto rounded-xl" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <p className="text-lg leading-relaxed mb-4 text-foreground" dangerouslySetInnerHTML={{ __html: bumpDescription }} />

                  <ul className="space-y-2 text-foreground text-sm">
                    <li className="flex items-start gap-2"><span className="text-secondary font-bold mt-0.5">✓</span><span><strong>Vitamin D3 1000 IU:</strong> Contributes to normal immune system function*</span></li>
                    <li className="flex items-start gap-2"><span className="text-secondary font-bold mt-0.5">✓</span><span><strong>Vitamin K2 (MK-7):</strong> Contributes to normal bone health*</span></li>
                    <li className="flex items-start gap-2"><span className="text-secondary font-bold mt-0.5">✓</span><span><strong>60-day supply</strong> (pairs perfectly with Phase 3)</span></li>
                    <li className="flex items-start gap-2"><span className="text-secondary font-bold mt-0.5">✓</span><span>Easy dropper format - mix with juice</span></li>
                  </ul>
                </div>

                {/* Price Block */}
                <div className="shrink-0 bg-surface-green-light border border-secondary/20 rounded-xl p-5 text-center md:w-44">
                  <p className="text-3xl font-black text-secondary">${(bumpUnitPrice * bumpQty).toFixed(2)}</p>
                  <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full font-bold text-xs mt-2 inline-block">SAVE ${((bumpOriginalPrice - bumpUnitPrice) * bumpQty).toFixed(2)}</div>
                  
                  {/* Qty selector */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <button
                      onClick={(e) => { e.preventDefault(); setBumpQty(Math.max(1, bumpQty - 1)); }}
                      className="w-8 h-8 rounded-full border border-border bg-card text-foreground font-bold text-lg flex items-center justify-center hover:bg-muted transition-colors"
                    >−</button>
                    <span className="text-lg font-bold text-foreground w-6 text-center">{bumpQty}</span>
                    <button
                      onClick={(e) => { e.preventDefault(); setBumpQty(Math.min(5, bumpQty + 1)); }}
                      className="w-8 h-8 rounded-full border border-border bg-card text-foreground font-bold text-lg flex items-center justify-center hover:bg-muted transition-colors"
                    >+</button>
                  </div>
                  
                  <p className="text-sm font-bold text-secondary mt-3">✓ 35% of customers<br/>add this!</p>
                </div>
              </div>

              {/* Social proof photos */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-5 pt-4 border-t border-border">
                <div className="flex gap-2 shrink-0">
                  {["https://i.pravatar.cc/150?img=19", "https://i.pravatar.cc/150?img=20", "https://i.pravatar.cc/150?img=21"].map((src, i) => (
                    <img key={i} src={src} alt="Customer" className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-border" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground text-center sm:text-left">Real customers loving their D3+K2 drops ⭐</p>
              </div>

              <p className="mt-4 italic text-xs text-muted-foreground">
                *These statements are authorized European health claims (EFSA). Product made in USA, cGMP certified, third-party tested.
              </p>
            </div>
          </div>
          <p className="text-center text-sm font-semibold text-accent mt-3 animate-pulse">👆 Click to add — one-time offer, not available after checkout</p>
        </div>

        {/* Countdown */}
        <div className="text-center mt-12">
          <div className="flex justify-center gap-3 md:gap-5 mb-5">
            {[
              { value: hours, label: "Hrs" },
              { value: minutes, label: "Min" },
              { value: seconds, label: "Sec" },
            ].map((item) => (
              <div key={item.label} className="bg-card p-3 md:p-5 rounded-xl md:rounded-2xl text-center min-w-[80px] md:min-w-[100px] border border-primary/20 shadow-sm">
                <div className="text-3xl md:text-4xl font-bold text-primary">{item.value}</div>
                <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest font-semibold">{item.label}</div>
              </div>
            ))}
          </div>

          <p className="text-primary text-sm md:text-lg font-medium bg-surface-blue-light inline-block px-4 md:px-6 py-2 md:py-3 rounded-xl border border-primary/15">
            {countdownWarning}
          </p>
        </div>
      </div>
    </section>
  );
};
