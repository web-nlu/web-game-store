export default function AccountDescription(accountDetail: AccountDetail ) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả chi tiết</h2>
      <p className="text-gray-700 mb-4">{accountDetail.description}</p>

      <h3 className="font-bold text-gray-900 mb-2">Đặc điểm nổi bật:</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        {accountDetail.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}