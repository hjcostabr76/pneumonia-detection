
export enum ImageExamEnum {
	PERSON_0001_VIRUS_0008 = 'person-0001-virus-0008',
	PERSON_0018_VIRUS_0049 = 'person-0018-virus-0049',
	PERSON_0037_VIRUS_0082 = 'person-0037-virus-0082',
	PERSON_0109_BAC_0526 = 'person-0109-bac-0526',
	PERSON_0121_BAC_0575 = 'person-0121-bac-0575',
	PERSON_0127_BAC_0603 = 'person-0127-bac-0603',
	PERSON_0149_BAC_0713 = 'person-0149-bac-0713',
	PERSON_0159_BAC_0746 = 'person-0159-bac-0746',
	PERSON_1649_VIRUS_2850 = 'person-1649-virus-2850',
	PERSON_1665_VIRUS_2878 = 'person-1665-virus-2878',
}

const enumValues = Object.values(ImageExamEnum)

export function toRaw(input: string): ImageExamEnum {
    const imgName = input.replace(/^(.+)((-out)?\..+)$/, '$1')
    if (!(enumValues as string[]).includes(imgName))
        throw new Error(`Unknown image file: '${input}'`)
    return imgName as ImageExamEnum
}

export function inputToOutput(input: ImageExamEnum): string {
    const [imgName, imgExtension] = input.split('.')
    return `${toRaw(imgName)}-out.${imgExtension}`
}

export function outputToInput(output: string): string {
    const [imgName, imgExtension] = output.split('.')
    return `${toRaw(imgName)}.${imgExtension}`
}

export function isValid(imgName: string): boolean {
    try {
        toRaw(imgName)
        return true
    } catch {
        return false
    }
}

export default ImageExamEnum