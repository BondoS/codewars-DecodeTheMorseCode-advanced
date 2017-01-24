var decodeBits = function(bits){
    // Remove starting and trailing zeros
   bits = bits.replace(/^0+/, '').replace(/0+$/, '');

   prevMatchsZeros = currentMatchesZeros = zerosLength = prevMatchsOnes = currentMatchesOnes = onesLength = 0,  i = 1;
    do {
        // Regex matches (zeros) like 101 or 1001 or 10001 etc.
        regexZeros = '10{'+i+'}1';
        // Regex matches (ones) like 10|010|01 or 110|0110|110 or 1110|01110|1110 etc.
        regexOnes = '^1{'+ i +'}0|01{' + i + '}0|01{'+ i +'}$';
        // There isn't any zeros, so there isn't any time unit, it is just a bunch of ones.
        if(!/0/.test(bits)){
          return '.';
        }
        // If there is match to zeros, count number of matches.
        if(bits.match(regexZeros)){ currentMatchesZeros = bits.match(new RegExp(regexZeros, 'g')).length;   }
        // If there is match to ones, count number of matches.
        if(bits.match(regexOnes)){  currentMatchesOnes = bits.match(new RegExp(regexOnes, 'g')).length;   }
        // If current zeros matches larger than previous, save its length.
        if(currentMatchesZeros > prevMatchsZeros){ zerosLength = i; }
        // If current ones matches larger than previous, save its length.
        if(currentMatchesOnes > prevMatchsOnes){ onesLength = i; }
        i++;
        //loop while prev zeros/ones matches is less than current OR its lenght are still 0.
    } while (currentMatchesZeros > prevMatchsZeros ? prevMatchsZeros = currentMatchesZeros : false || currentMatchesOnes > prevMatchsOnes ? prevMatchsOnes = currentMatchesOnes : false|| zerosLength == 0 || onesLength == 0)
    // get the lower length and assume it is the timeunit.
    TU = Math.min(zerosLength,onesLength);

    // ToDo: Accept 0's and 1's, return dots, dashes and spaces
    // if you have trouble discerning if the particular sequence of 1's is a dot or a dash, assume it's a dot (RegExp('1+','g')).
    bits = bits.replace(new RegExp('1'.repeat(3*TU), 'g'),'-').replace(new RegExp('0'.repeat(7*TU), 'g'),'   ').replace(new RegExp('0'.repeat(3*TU), 'g'),' ').replace(new RegExp('1+','g'),'.').replace(new RegExp('0'.repeat(TU), 'g'), '');

    return bits;
}

var decodeMorse = function(morseCode){
    // ToDo: Accept dots, dashes and spaces, return human-readable message
  var wordsCode = morseCode.trim().split("   "), result = '';
  for(i=0; i<wordsCode.length; i++){
    var letters = wordsCode[i].split(" "), word= '';
    for(j=0; j<letters.length; j++){
      word += MORSE_CODE[letters[j]];
    }
    result += word+ ((wordsCode.length == (i+1)) ? '' : ' ');
  }
  return result;
}
// Thanks for github.com/bashmohandes for helping me out.
