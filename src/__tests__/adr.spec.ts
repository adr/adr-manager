import { describe, it, expect } from 'vitest'
import {ArchitecturalDecisionRecord} from "../infrastructure/domain/model/ArchitecturalDecisionRecord";

describe('Test ADR Model', () => {
  it('renders properly', () => {
    const adr = new ArchitecturalDecisionRecord(
      ["Option One"],
      "Context and problem statement",
      "20-2-2020",
      "deciders"
      );
    console.log(adr.consideredOptions[0]);
    console.log(adr.links);
  })
})
