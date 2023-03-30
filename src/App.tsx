import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { useStore } from './hooks/useStore'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import TextArea from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const { fromLanguage, setFromLanguage, interchangeLanguages, setToLanguage, toLanguage, fromText, result, setFromText, setResult, loading } = useStore()

  const debouncedText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debouncedText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedText })
      .then(result => {
        if (result === null || result === undefined) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
  }, [debouncedText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h1>Google translate</h1>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
            <TextArea type={SectionType.From} value={fromText} onChange={setFromText} />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
            <div style={{ position: 'relative' }}>
              <TextArea type={SectionType.To} value={result} onChange={setResult} loading={loading} />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                <Button
                  variant='link'
                  onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button
                  variant='link'
                  onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
