export default function Subscribe() {
  return (
    <section className="mb-12 bg-blue-700 text-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Đăng ký nhận thông tin ưu đãi</h2>
          <p className="text-blue-100 mb-6">Nhận thông tin về các tài khoản mới và ưu đãi đặc biệt từ Game Shop.</p>
          <form className="flex flex-col md:flex-row gap-2">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-3 rounded-md"
            >
              Đăng ký
            </button>
          </form>
          <div className="text-sm text-blue-200 mt-4">
            Chúng tôi không bao giờ chia sẻ thông tin của bạn với bên thứ ba.
          </div>
        </div>
      </div>
    </section>
  )
}