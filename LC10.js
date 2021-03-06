/**
 * @param {string} s for string
 * @param {string} p for pattern
 * @return {boolean}
 */

    // func parseWildCards
      // split p to chars
    // create a resultFlags:array which length = s
    // split the pattern to ps: array
    // type: 1 step: a, ., multiple steps: .*, a*
    // loop ps each
    // for each p, decide step
    // log out steps
    // log out resultFlags

/**
    - reverse building: bottom to top
    - map, reduce, filter, foreach
    - DEBUG, RELEASE logs
*/
const v = 1; // verbose

var isMatch = (s, p) => {
    // create a empty or with sth length-defined array
    // var foo = new Array(45); // create an empty array with length 45
    
    var resultFlags = new Array(s.split('').length);
    for (i = 0; i < resultFlags.length; i++) {
      resultFlags[i] = false;
    }
    // resultFlags.forEach((flag, index) => {
    //     this[index] = false;
    // }, resultFlags);
    if (v === 1) { console.log('Initial result flags: ', resultFlags)};
    var checkingPosition = 0;
    
    // const ALPHABET = 0;
    // const SINGLE = 1;
    // const MULTIPLE = 2;
    // Mock parsedPatterns
    // const parsedPatterns = {'a*':}; 
    
    const patterns = parseWildCards(p);



    parseWildCards(p).forEach((pattern, index, patterns) => {
      const isAny = Object.keys(pattern)[0] === 'Any';
      const isZeroOrMoreChars = Object.keys(pattern)[0] === 'zeroOrMoreChars';
      const hasNext = index < patterns.length - 1;

      // if pattern is longer than string
      // should I reverse the matching process?
      if (checkingPosition >= s.length) {
          resultFlags.push(false);
          return;
        }

      // string >= pattern
      var char = 'char test against';
      switch (Object.keys(pattern)[0]) {
        case 'char':
          char = pattern['char'];
          // resultFlags[checkingPosition] = char === s[checkingPosition];
          if (char === s[checkingPosition]) {
            resultFlags[checkingPosition] = true;
            if (v === 1) { console.log(`Checking position[${checkingPosition}]: ${s[checkingPosition]} | ${char}\nResult: ${resultFlags[checkingPosition]}`)}
            checkingPosition ++;
          } else if (checkingPosition < s.length) {
            resultFlags[checkingPosition] = false;
            if (v === 1) { console.log(`Failed to check position[${checkingPosition}]: ${s[checkingPosition]} | ${char}\nResult: ${resultFlags[checkingPosition]}`)}
            return;
          }
          break;

        case 'zeroOrMoreChars': // ?*
          char = pattern['zeroOrMoreChars'];
          if (v === 1) { console.log(`Zero or more chars: ${char}`)};

          if (hasNext) {
            // .*, a* 
            // a
            // .
          }

          for (i = checkingPosition; i < s.length; i++) {
            if (char === s[checkingPosition]) {
              resultFlags[checkingPosition] = true;
              if (v === 1) { console.log(`Checking position[${checkingPosition}]: ${s[checkingPosition]} | ${char}\nResult: ${resultFlags[checkingPosition]}`)}
              checkingPosition ++;
            } else {
              if (v === 1) { console.log(`zeroOrMoreChars breaks at location ${checkingPosition}`)};
              break;
            }
          }
          break;

        case 'any': // .*
          char = pattern['any'];

          for (i = checkingPosition; i < s.length; i++) {
              resultFlags[checkingPosition] = true;
              if (v === 1) { console.log(`Checking position[${checkingPosition}]: ${s[checkingPosition]} | ${char}\nResult: ${resultFlags[checkingPosition]}`)}
              checkingPosition ++;
          }
          break;

        case 'anyChar': // .
          char = pattern['anyChar'];
          resultFlags[checkingPosition] = true;
          if (v === 1) { console.log(`Checking position[${checkingPosition}]: ${s[checkingPosition]} | ${char}\nResult: ${resultFlags[checkingPosition]}`)}
          checkingPosition ++;
          break;
      }
    });
    

    console.log("Result flags: ", resultFlags);
    return check(resultFlags);
    // mockResultFlags = ['a', false];
    // console.log("Result flags: ", mockResultFlags);
    // return check(mockResultFlags);
};


const parseWildCards = (p) => {
        // ab.c*d.*
        // a.b*.*c

        const chars = p.split('');
        var patterns = [];
        for(i = 0; i < chars.length; i++) {
          const hasNext = i+1 < chars.length;
          const current = chars[i];
          const next = hasNext ? chars[i+1] : '';
          // debug following
          // String.prototype.isChar = (char) => {return char != '.' && char != '*'};
          const isChar = (char) => {return char !== '.' && char !== '*'};
          const isDot = (char) => { return char === '.'};
          // add func to String
          // Start with char
            if (isChar(current)) {
                if (hasNext) {
                  if (isChar(next) || isDot(next)) { // char + char || char.
                    patterns.push({char: chars[i]});
                    if (v === 1) { console.log(`Location ${i}: 'char + char || char. : ${chars[i]}`)};
                  } else if (next === '*') { // char + *
                    patterns.push({zeroOrMoreChars: chars[i]});
                    if (v === 1) { console.log(`Round ${i}: 'char + *: ${chars[i]}`)};
                    i++;
                  }
                } else { // char EOF
                    patterns.push({char: chars[i]});
                    if (v === 1) { console.log(`Round ${i}: 'char EOF: ${chars[i]}`)};
                }
            } else if (isDot(current)) {
              if (hasNext) {
                if (next === '*') {
                  patterns.push({any: '.*'});
                } else {
                  patterns.push({anyChar:'.'});
                }
              } else {
                  patterns.push({anyChar:'.'});
                }
            }
        }
        console.log('Parsed pattern array: ', patterns);
        return patterns;

  // const mockReturn = [
  //   {char: 'a'},
  //   {anyChar: '.'},
  //   {zeroOrMoreChars: 'b*'},
  //   {any: '.*'},
  //   {char: 'c'}
  // ]

  //   const mockReturn = [
  //   {char: 'a'},
  //   {char: 'a'}
  // ]
  // return mockReturn;
}

const check = (resultFlags) => {
    var pass = true;
    resultFlags.forEach(flag => {
      if (flag !== true) {
        pass = false;
        return;
      }
    })
    return pass;
}

// const testCheckResultFlags = (resultFlagsArray) => {
//   for 
// }


const fullTest = (cases) => {
  var passCount = 0;
  for (let key in cases) {
    const testCase = cases[key];
    console.log(`${testCase.s} | ${testCase.p}`);
    if (isMatch(testCase.s, testCase.p) === testCase.a) {
      console.log('[PASS]');
      console.log('----------------------------------------------------------------------');
      passCount ++;
    } else {
      console.log('[FAIL]');
      console.log('---------------------------------FAIL---------------------------------');
    }
  }
  const caseLength = Object.keys(cases).length;
  const passRate = Math.round(passCount / caseLength * 100);
  console.log(`PASS: ${passRate} %`)
}

const cases = {
  fullMatch: {s: 'ab', p: 'ab', a: true}, 
  fullMatch2: {s: 'ab', p: 'ac', a: false},
  fullMatch3: {s: 'radio', p: 'radio', a: true},
  fullMatch4: {s: 'Radio', p: 'radio', a: false},
  fullMatch5: {s: 'aaa', p: 'aaaa', a: false},
  asterisk: {s: 'me', p: 'me*', a: true},
  asterisk2: {s: 'mee', p: 'me*', a: true},
  asterisk3: {s: 'meek', p: 'me*k', a: true},
  asterisk4: {s: 'mee', p: 'me*4', a: false},
  asterisk5: {s: 'aaa', p: 'a*a', a: true},
  dot: {s: 'aa', p: 'a.', a: true},
  dot2: {s: 'aab', p: 'a.b', a: true},
  dot3: {s: 'aa', p: 'a.*', a: true},
  dot4: {s: 'aa', p: 'a.*c', a: false},
  mixed: {s: 'tolerate', p: 'tol.*', a: true},
  mixed2: {s: 'tolerrrate', p: 'tol.r*ate', a: true},
  mixed3: {s: 'toxxlllxxxx', p: 'to..l*.*', a: true},
  mixed4: {s: 'ab', p: '.*c', a: false},
  };

// run test
fullTest(cases);
