const {palindrome} = require('../utils/for_testing')

test.skip('palindrome of Jose', () => {
    const result = palindrome('JoseRg09')

    expect(result).toBe('90gResoJ')
})

test.skip('palindrome of empty string', () => {
    const result = palindrome('')
    expect(result).toBe('')
})

test.skip("palindrom of undefined", () => {
    const result = palindrome()
    expect(result).toBeUndefined()
})