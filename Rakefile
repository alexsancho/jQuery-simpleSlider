require 'rubygems' unless defined? Gem # rubygems is only needed in 1.8
require "bundler/setup"

module Compressor
  def self.compress(jscode)
    require 'net/http'
    require 'uri'

    response = Net::HTTP.post_form(URI.parse('http://closure-compiler.appspot.com/compile'), {
      'js_code' => jscode,
      'compilation_level' => "SIMPLE_OPTIMIZATIONS",
      'output_format' => 'text',
      'output_info' => 'compiled_code'
    })
    response.body
  end

  def self.compress_with_comment(jscode)
    comment    = jscode.match(/(\/\*!.*?\*\/)/m) && $1
    compressed = compress(jscode)
    compressed = comment + "\n" + compressed  if comment
    compressed
  end
end

task :default do
  puts "==> Compressing (jQuery.simpleSlider.min.js)..."
  str = File.read('jQuery.simpleSlider.js')
  str = Compressor.compress_with_comment(str)
  File.open('jQuery.simpleSlider.min.js', 'w') { |f| f.write str }
end
