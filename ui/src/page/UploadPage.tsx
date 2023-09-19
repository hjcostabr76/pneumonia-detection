import { UploaderCP } from '../UploaderCP';


interface IUploadPageProps {
    onUploadSuccess: (imgName: string, isHealthy: boolean) => void
}

export function UploadPage(props: IUploadPageProps): JSX.Element {

    return (
        <section className='page upload'>
            <UploaderCP onUploadSuccess={props.onUploadSuccess}/>
        </section>
    )
}
