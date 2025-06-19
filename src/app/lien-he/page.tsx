import {Facebook, Mail, MessageCircle, Phone} from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Số điện thoại',
      value: '+84 123 456 789',
      description: 'Liên hệ trực tiếp với chúng tôi',
      href: 'tel:+84123456789',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@company.com',
      description: 'Gửi email cho chúng tôi',
      href: 'mailto:contact@company.com',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      icon: MessageCircle,
      title: 'Zalo',
      value: '0123 456 789',
      description: 'Chat qua Zalo',
      href: 'https://zalo.me/0123456789',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      icon: Facebook,
      title: 'Facebook',
      value: 'fb.com/yourpage',
      description: 'Theo dõi fanpage của chúng tôi',
      href: 'https://facebook.com/yourpage',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ qua các kênh dưới đây để được tư vấn nhanh nhất.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <a
                key={index}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : '_self'}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : ''}
                className={`block bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg hover:scale-105 ${contact.hoverColor}`}
              >
                <div className="text-center">
                  <div className={`${contact.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`h-8 w-8 ${contact.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {contact.title}
                  </h3>
                  <p className={`text-xl font-bold ${contact.color} mb-2`}>
                    {contact.value}
                  </p>
                  <p className="text-sm text-gray-600">
                    {contact.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};