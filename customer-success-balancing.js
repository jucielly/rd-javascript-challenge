/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */
function customerSuccessBalancing(
  customerSuccess, //id e nivel da experiencia do CS
  customers, //id e nivel de experiência dos Clientes
  customerSuccessAway //ids dos CustomerSuccess indisponíveis
) {
  /**
   * ===============================================
   * =========== Write your solution here ==========
   * ===============================================
   */

  let customerSuccessWithMostClients = -1; // 0 wont suit this variable, beacause 0 implies in a tie
  let highestClientQuantity = 0;

  const activeCSs = customerSuccess.filter(
    (css) => !customerSuccessAway.includes(css.id)
  );

  const activesCSsOrderedByMinimunScore = activeCSs.sort(
    (a, b) => a.score - b.score
  );

  activesCSsOrderedByMinimunScore.forEach((currentCustumerSuccess) => {
    let clientQuantity = 0;

    for (let i = 0; i < customers.length; i++) {
      const isCsMatchesCustomerScore =
        customers[i].score <= currentCustumerSuccess.score;
      const isCustomerNotAssigned = !customers[i].assigned;
      if (isCsMatchesCustomerScore && isCustomerNotAssigned) {
        clientQuantity++;
        customers[i].assigned = true;
      }
    }

    if (clientQuantity > highestClientQuantity) {
      highestClientQuantity = clientQuantity;

      customerSuccessWithMostClients = currentCustumerSuccess.id;
    } else if (clientQuantity === highestClientQuantity) {
      customerSuccessWithMostClients = 0;
    }
  });

  return customerSuccessWithMostClients;
}

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt) {
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});
