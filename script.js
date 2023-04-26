//match 5, mismatch -1, gap penalty, -4
//
const MATCH_SCORE = 5;
const MISMATCH_SCORE = -1;
const GAP_PENALTY = -4;

function findOptimalLocalAlignment(sequence1, sequence2) {
  let matrix = [];
  let maxScore = 0;
  let maxPosition = [0, 0];

  for (let i = 0; i <= sequence1.length; i++) {
    matrix.push([]);
    for (let j = 0; j <= sequence2.length; j++) {
      matrix[i].push(0);

      if (i === 0 || j === 0) {
        continue;
      }

      let matchScore = sequence1[i - 1] === sequence2[j - 1] ? MATCH_SCORE : MISMATCH_SCORE;
      let scores = [        matrix[i - 1][j - 1] + matchScore,
        matrix[i - 1][j] + GAP_PENALTY,
        matrix[i][j - 1] + GAP_PENALTY,
        0
      ];

      matrix[i][j] = Math.max(...scores);
      if (matrix[i][j] > maxScore) {
        maxScore = matrix[i][j];
        maxPosition = [i, j];
      }
    }
  }

  let i = maxPosition[0];
  let j = maxPosition[1];
  let alignmentScore = matrix[i][j];
  let alignedSequence1 = "";
  let alignedSequence2 = "";

  while (i > 0 || j > 0) {
    if (matrix[i - 1][j - 1] + (sequence1[i - 1] === sequence2[j - 1] ? MATCH_SCORE : MISMATCH_SCORE) === matrix[i][j]) {
      alignedSequence1 = sequence1[i - 1] + alignedSequence1;
      alignedSequence2 = sequence2[j - 1] + alignedSequence2;
      i--;
      j--;
    } else if (matrix[i - 1][j] + GAP_PENALTY === matrix[i][j]) {
      alignedSequence1 = sequence1[i - 1] + alignedSequence1;
      alignedSequence2 = "-" + alignedSequence2;
      i--;
    } else if (matrix[i][j - 1] + GAP_PENALTY === matrix[i][j]) {
      alignedSequence1 = "-" + alignedSequence1;
      alignedSequence2 = sequence2[j - 1] + alignedSequence2;
      j--;
    } else {
      break;
    }
  }

  return {
    alignedSequence1,
    alignedSequence2,
    alignmentScore
  };
}
