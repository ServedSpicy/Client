
/**
 *  @brief String 🠖 Char[]
 */

export function toChars(string){
    return [...string];
}


/**
 *  @brief Char[] 🠖 U8[]
 */

export function toBytes(string){
    return toChars(string)
        .map((char) => char.codePointAt(0));
}


/**
 *  @brief U16 🠖 2 x U8
 */

export function serializeWord(number){
    const left = number >> 8;
    const right = number - (left << 8);
    return [ left , right ];
}
