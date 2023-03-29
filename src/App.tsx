import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Form, Stack } from 'react-bootstrap'
import './App.css'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/Icons'
import { useStore } from './hooks/useStore'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'

function App() {
  const { fromLanguage, setFromLanguage, interchangeLanguages, setToLanguage, toLanguage } = useStore()

  return (
    <Container fluid>
      <h1>Google translate</h1>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
            <Form.Control as='textarea' placeholder='Enter text' autoFocus style={{ height: '150px' }} />
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
            <Form.Control as='textarea' placeholder='Translate' style={{ height: '150px' }} />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
