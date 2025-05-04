// components/ConfirmationModal.jsx
export default function ConfirmationModal({ isOpen, onCancel, onConfirm, message }) {
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-black/85 py-10 w-3/5 h-[45%] text-center border-5 popup">
          <h2 className="text-4xl audiowide mb-8">Uwaga!</h2>
          <p className="text-2xl audiowide mb-14 whitespace-pre-wrap">{message}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="btn-m1 btn-black py-2 px-12 text-2xl audiowide text-red-500"
            >
              Anuluj
            </button>
            <button
              onClick={onConfirm}
              className="btn-m1 btn-green text-[#00FF85] py-2 px-6 text-2xl audiowide"
            >
              Kontynuuj
            </button>
          </div>
        </div>
      </div>
    )
  }
  