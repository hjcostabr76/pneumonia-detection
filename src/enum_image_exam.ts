import { IMG_DIR, IMG_PREFIX, IMG_TYPE } from './constants'

export enum ImageExamEnum {
    PERSON_0120_NORMAL_0001 = '0120-normal-0001',
    PERSON_0001_VIRUS_0008 = '0001-virus-0008',
	PERSON_0018_VIRUS_0049 = '0018-virus-0049',
	PERSON_0037_VIRUS_0082 = '0037-virus-0082',
	PERSON_0109_BAC_0526 = '0109-bac-0526',
	PERSON_0121_BAC_0575 = '0121-bac-0575',
	PERSON_0127_BAC_0603 = '0127-bac-0603',
	PERSON_0149_BAC_0713 = '0149-bac-0713',
	PERSON_0159_BAC_0746 = '0159-bac-0746',
	PERSON_1649_VIRUS_2850 = '1649-virus-2850',
	PERSON_1665_VIRUS_2878 = '1665-virus-2878',
}

const enumValues = [...Object.values(ImageExamEnum)]

function addPrefix(img: string): string {
    return `${IMG_PREFIX}-${img}`
}

function addExtension(img: string): string {
    return `${img}.${IMG_TYPE}`
}

export function toBase(img: string): ImageExamEnum | undefined {
    for (const _img of enumValues) {
        if (img.includes(_img))
            return _img
    }
}

export function isGood(img: string): boolean {
    const baseName = toBase(img)
    return !!baseName && img.includes('normal')
}

function assertImg(img: string): void {
    const baseName = toBase(img)
    if (!baseName || !img.includes(`${addExtension(addPrefix(baseName))}`))
        throw new Error(`Unknown image file: '${img}'`)
}

export function toReport(img: string, isFull = false): string | undefined {
    const baseName = toBase(img)
    if (baseName) {
        const aux = addExtension(addPrefix(`${baseName}-out`))
        return isFull ? addDir(aux) : aux
    }
}

export function toExam(img: string): string | undefined{
    const baseName = toBase(img)
    if (baseName)
        return addExtension(addPrefix(baseName))
}

export function addDir(img: string): string | undefined {
    const baseName = toBase(img)
    if (baseName)
        return `${IMG_DIR}/${baseName}/${img}`
}

export function isValid(img: string): boolean {
    try {
        assertImg(img)
        return true
    } catch {
        return false
    }
}

export default ImageExamEnum