"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ruleGroups } from "@/lib/site";
import { cn } from "@/lib/utils";

export function RulesAccordion() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="space-y-3">
      {ruleGroups.map((group, i) => {
        const isOpen = open === i;
        return (
          <div
            key={group.title}
            className={cn(
              "overflow-hidden border bg-ash-900 transition-colors",
              isOpen ? "border-ember/40" : "border-ash-700",
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center gap-5 px-6 py-5 text-left transition-colors hover:bg-ash-850"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "font-display text-3xl font-black tabular-nums transition-colors",
                  isOpen ? "text-fire" : "text-ash-600",
                )}
              >
                0{i + 1}
              </span>
              <h3 className="flex-1 font-display text-2xl font-bold uppercase tracking-wide text-bone">
                {group.title}
              </h3>
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center border text-xl transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-ember/50 text-ember"
                    : "border-ash-600 text-smoke",
                )}
              >
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ul className="space-y-3 border-t border-ash-700 px-6 py-6 pl-[4.7rem]">
                    {group.rules.map((rule, r) => (
                      <li
                        key={r}
                        className="relative pl-6 text-sm leading-relaxed text-smoke before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:bg-ember/70"
                      >
                        {rule}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
