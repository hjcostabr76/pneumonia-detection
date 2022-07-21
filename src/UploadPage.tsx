import { UploaderCP } from './UploaderCP';


interface IUploadPageProps {
    onUploadSuccess: (imgName: string, isHealthy: boolean) => void
}

/**
 * TODO: 2022-07-20 - ADD Descricao
 * TODO: 2022-07-20 - Move file
 */
export function UploadPage(props: IUploadPageProps): JSX.Element {

    return (
        <section className='page upload'>
            <UploaderCP onUploadSuccess={props.onUploadSuccess}/>
        </section>
    )
}
