export { }

declare global {
    interface String {
        firstLetterCaps(): string
        isUpperCase(): boolean
        toLowerCaseExceptAbbreviations(): string
    }

    interface StringConstructor {
        isNullOrEmpty(str: string | null | undefined): str is null | undefined
        isNullOrWhitespace(str: string | null | undefined): str is null | undefined
    }
}

