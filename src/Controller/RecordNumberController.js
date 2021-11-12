const { RecordNumber } = require("../Model/RecordNumber");

async function getNextRecordNumber() {
  const numbers = await RecordNumber.findAll();

  const generateNewSequence = async function () {
    const newSeq = await createNewSequence(0);

    return { record_seq: newSeq.record_seq, record_year: newSeq.record_year };
  };

  if (numbers.length === 0) {
    return generateNewSequence();
  }

  const storedSequence = numbers[numbers.length - 1];
  const year = new Date().getFullYear();

  if (storedSequence.record_year < year) {
    return generateNewSequence();
  }

  let num = Number.parseInt(storedSequence.record_seq);
  num++;

  const newNumber = await createNewSequence(num);

  return { record_seq: newNumber.record_seq, record_year: newNumber.record_year };
}

function formatRecordSequence(seq, year) {
  const prefix = `000000`;
  let seqString = `${seq}`;
  let len = 6;

  for (let digits = 1; digits <= len; digits++) {
    if (digits === seqString.length) {
      len -= digits;
      break;
    }
  }

  seqString = `${prefix.substr(0, len)}${seq}/${year}`;

  return seqString;
}

async function createNewSequence(n) {
  return RecordNumber.create({
    record_seq: n > 0 ? n : 1,
    record_year: new Date().getFullYear(),
  });
}

module.exports = { getNextRecordNumber, formatRecordSequence, createNewSequence };
