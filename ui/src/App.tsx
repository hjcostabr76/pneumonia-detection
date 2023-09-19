import './App.css';
import 'antd/dist/antd.css'
import { UploadPage } from './page/UploadPage';
import { DiagnosisPage } from './page/DiagnosisPage';
import { useState } from 'react'
import * as examEnum from './enum_image_exam'

type ModeT = 'upload' | 'report'

function App() {

	const [mode, setMode] = useState<ModeT>('upload')
	const [isHealthy, setIsHealthy] = useState<boolean>(false)
	const [examImage, setExamImage] = useState<string>()

	function onUploadSuccess(img: string, _isHealthy: boolean): void {
		setExamImage(img)
		setMode('report')
		setIsHealthy(_isHealthy)
	}

	return (
		<div className="app">
			<header className="header">
				<span>P</span> Detect
			</header>

			<main>
				{
					mode === 'upload' &&
					<UploadPage onUploadSuccess={onUploadSuccess}/>
				}
				
				{
					mode === 'report' &&
					<DiagnosisPage
						examImage={examEnum.toExam(examImage ?? '') ?? ''}
						reportImage={!isHealthy ? examEnum.toReport(examImage ?? '') : undefined}
						isHealthy={isHealthy}
						message={
							isHealthy
								? 'A análise artificial não encontrou nenhum indício de anomalia'
								: 'A análise artificial detectou indícios de alta probabilidade de anomalia no pulmão examinado'
						}
					/>
				}
			</main>
		</div>
	);
}

export default App;
