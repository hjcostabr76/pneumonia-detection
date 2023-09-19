import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useState, useEffect } from 'react'
import { COLOR_MAIN } from './constants'
import { LoaderCP } from './LoaderCP'

import * as examEnum from './enum_image_exam'

type UploadStatusT = 'stopped' | 'ongoing' | 'success' | 'failure'

const UPLOAD_STEP = 25
const UPLOAD_DELAY = 800 // ms

const isUploadFinished = (status: UploadStatusT) =>
	(['success', 'failure'] as UploadStatusT[]).includes(status)

interface IUploaderCPProps {
	onUploadSuccess: (imgName: string, isHealthy: boolean) => void
}

export function UploaderCP(props: IUploaderCPProps): JSX.Element {

	const [uploadStatus, setUploadStatus] = useState<UploadStatusT>('stopped')
	const [uploadProgress, setUploadProgress] = useState<number>(0)
	const [imgName, setImgName] = useState<string>()

	useEffect(onUploadStatusChange, [uploadStatus])
	useEffect(onUploadProgress, [uploadProgress])

	function resetState(): void {
		setUploadStatus('stopped')
		setUploadProgress(0)
	}

	function startUpload(fileName: string): void {
		setImgName(fileName)
		setUploadStatus('ongoing')
	}

	function onUploadStatusChange(): void {
		setUploadProgress(current => uploadStatus === 'ongoing' ? 1 : current)
	}

	function onUploadProgress(): void {
		
		if (uploadStatus !== 'ongoing')
			return

		if (uploadProgress >= 100)
			return onUploadEnd()
		
		setTimeout(
			() => setUploadProgress(prev => prev + Math.ceil(UPLOAD_STEP * Math.random())),
			UPLOAD_DELAY
		)
	}

	function onUploadEnd(): void {
		const isSuccess = examEnum.isValid(imgName ?? '')
		if (!isSuccess)
			return setUploadStatus('failure')
		setUploadStatus('success')
	}

	function onSuccessNotified(): void {
		props.onUploadSuccess(imgName ?? '', examEnum.isGood(imgName ?? ''))
	}

	function onFailureNotified(): void {
		resetState()
	}

    return (
        <div style={{
            width: '90%',
            margin: '0 auto',
            right: 0,
            left: 0,
			position: 'relative',
          }}
        >
			{
				!isUploadFinished(uploadStatus) &&
				<Upload.Dragger
					beforeUpload={(file: { name?: string }) => {
						startUpload(file.name ?? '')
						return Upload.LIST_IGNORE
					}}
					style={{
						minHeight: 400,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						filter: uploadStatus === 'ongoing' ? 'blur(2px)' : undefined,
					}}
				>
					<p className="ant-upload-drag-icon">
						<InboxOutlined/>
					</p>

					<p className="ant-upload-text">Arraste a imagem do exame</p>
				</Upload.Dragger>
			}


			{
				uploadStatus !== 'stopped' &&
				<LoaderCP
					progress={uploadProgress}
					size={130}
					color={COLOR_MAIN}
					successAction={onSuccessNotified}
					successText={'Ir para diagnóstico'}
					failureAction={onFailureNotified}
					failureText={'Imagem inválida. Clique para recomeçar'}
					status={
						uploadStatus === 'failure'
							? 'exception'
							: uploadStatus === 'success' ? 'success' : undefined
					}
				/>
			}
        </div>
    )
}
