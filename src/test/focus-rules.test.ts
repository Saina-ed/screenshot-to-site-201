import { describe,it,expect } from 'vitest';
import { biologyNotes,quizAfter,generateNotes,evaluateAnswer } from '@/features/focus/model';
describe('Focus Frame learning rules',() => {
 it('places recall quizzes after note 4 and note 8, not the final note',() => {expect(biologyNotes.map((_,i) => i).filter(i => quizAfter(i,9))).toEqual([3,7]);});
 it('keeps the nine photosynthesis concepts for mock generation',() => {expect(generateNotes('Photosynthesis uses chlorophyll to make glucose.','Balanced')).toHaveLength(9);});
 it('does not award positive feedback to an unrelated answer',() => {expect(evaluateAnswer('I like football','Chlorophyll absorbs light energy for photosynthesis.').good).toBe(false);expect(evaluateAnswer('Chlorophyll absorbs light energy','Chlorophyll absorbs light energy for photosynthesis.').good).toBe(true);});
});
