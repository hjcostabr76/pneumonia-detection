import * as examEnum from '../enum_image_exam'
import { Alert } from 'antd'

interface IDiagnosisPageProps {
    examImage: string
    reportImage?: string
    isHealthy: boolean
    message: string
}

export function DiagnosisPage(props: IDiagnosisPageProps): JSX.Element {

    const examImg = examEnum.addDir(props.examImage) ?? ''
    const reportImage = examEnum.addDir(props.reportImage ?? '') ?? ''

    return (
        <section className={'page diagnosis'}>
            <header>
                Diagnóstico
            </header>

            <main>
                <div className='img_wrapper'>
                    <img src={examImg} alt={'Imagem do Exame'}/>
                </div>
                {
                    !!reportImage &&
                    <div className='img_wrapper'>
                        <img src={reportImage} alt={'Laudo artificial'}/>
                    </div>
                }
            </main>

            <footer className={props.isHealthy ? 'success' : 'success'}>
                <Alert
                    style={{ maxWidth: 500 }}
                    message={!props.isHealthy ? 'Anomalia Detectada' : 'Pulmão saudável'}
                    type={!props.isHealthy ? 'warning' : 'success'}
                    description={props.message}
                    showIcon
                />
            </footer>
        </section>
    )
}
