import Modal from '@mui/material/Modal'

interface Props {
  isOpen: boolean
  handleClose: () => void
  children: JSX.Element
}

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4
// }

export const CustomModal = ({ isOpen, handleClose, children }: Props) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {children}
    </Modal>
  )
}
