// calculate the similarity of 2 vectors of numbers
// returns a number between 0 and 1

export default function cosineSimilarity(A: number[], B: number[]) {
  let dotProduct = 0;
  let mA = 0;
  let mB = 0;
  for (let i = 0; i < A.length; i++) {
    // here you missed the i++
    dotProduct += A[i] * B[i];
    mA += A[i] * A[i];
    mB += B[i] * B[i];
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  const similarity = dotProduct / (mA * mB); // here you needed extra brackets
  return similarity;
}
