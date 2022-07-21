import { UploaderCP } from './UploaderCP';


interface IUploadPageProps {
    onUploadSuccess: (imgName: string) => void
}

/**
 * TODO: 2022-07-20 - ADD Descricao
 */
export function UploadPage(props: IUploadPageProps): JSX.Element {

    return (
        <section
            className='page'
            style={{
                width: '90%',
                maxWidth: 930,
            }}
        >
            <UploaderCP onUploadSuccess={props.onUploadSuccess}/>
        </section>
    )
}
