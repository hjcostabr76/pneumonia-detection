import { Progress, ProgressProps } from 'antd';
import { Button } from 'antd';

interface ILoaderCPProps {
    progress: number
    status?: ProgressProps['status']
    size?: number
    color?: string
    failureAction?: () => void
    successAction?: () => void
    failureText?: string
    successText?: string
}

/**
 * TODO: 2022-07-20 - ADD Descricao
 */
export function LoaderCP(props: ILoaderCPProps): JSX.Element {

    const showSuccessAction = props.status === 'success' && !!props.successAction
    const showErrorAction = props.status === 'exception' && !!props.failureAction

    return (
        <div className='loaderWrapper'>
            <Progress
                type={'circle'}
                percent={props.progress}
                width={props.size ?? 80}
                strokeColor={props.status !== 'exception' ? props.color : undefined}
                status={props.status}
            />

            {
                (showSuccessAction || showErrorAction) &&
                <div className='loaderActionWrapper'>
                    {
                        showSuccessAction &&
                        <Button type="primary" block onClick={props.successAction}>
                            {props.successText ?? 'Sucesso'}
                        </Button>
                    }

                    {
                        showErrorAction &&
                        <Button type="primary" block danger onClick={props.failureAction}>
                            {props.failureText ?? 'Falha'}
                        </Button>
                    }
                </div>
            }
        </div>
    )
}