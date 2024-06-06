import { describe, it, expect } from 'vitest'
import {md2adr, adr2md, naturalCase2snakeCase, snakeCase2naturalCase} from "../infrastructure/service/parser";
import { randomStrings, MD_ParsedMADR_Pairs, validMarkdownADRs } from "./constants";

for (let i = 0; i < randomStrings.length; i++) {
  it("Test parser convergence of random strings.", (): void => {
    let result1 = adr2md(md2adr(randomStrings[i]));
    let result2 = adr2md(md2adr(result1));
    expect(result2).toBe(result1);
  });
}
