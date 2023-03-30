import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  value: string
  onChange: (value: string) => void
}

const commonStyle = { height: '150px', border: 0, resize: 'none' as const }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Enter text'
  if (loading === true) return 'Loading...'
  return 'Translate'
}

const TextArea = ({ loading, type, value, onChange }: Props) => {
  const style = type === SectionType.From ? commonStyle : { ...commonStyle, backgroundColor: '#f5f5f5' }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <Form.Control as='textarea' placeholder={getPlaceholder({ type, loading })} autoFocus={type === SectionType.From} style={style} value={value} onChange={handleChange} disabled={type === SectionType.To} />
  )
}

export default TextArea
