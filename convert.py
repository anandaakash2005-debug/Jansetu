import re

def convert():
    with open('app/login/index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract the script content and remove the tag
    script_match = re.search(r'<script>(.*?)</script>', html, re.DOTALL)
    script_content = script_match.group(1) if script_match else ""
    html = re.sub(r'<script>.*?</script>', '', html, flags=re.DOTALL)

    # Convert class to className, for to htmlFor
    html = re.sub(r'\bclass=', 'className=', html)
    html = re.sub(r'\bfor=', 'htmlFor=', html)
    
    # Close self-closing tags
    tags = ['img', 'input', 'hr', 'br', 'link', 'meta']
    for tag in tags:
        # Match <tag ... > but not <tag ... />
        html = re.sub(rf'<({tag}\b[^>]*?)(?<!/)>', r'<\1 />', html, flags=re.IGNORECASE)

    # Style block needs to be converted
    style_match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
    if style_match:
        css = style_match.group(1)
        # Using dangerouslySetInnerHTML
        html = re.sub(r'<style>.*?</style>', f"<style dangerouslySetInnerHTML={{{{__html: `{css}`}}}} />", html, flags=re.DOTALL)

    # Remove <!DOCTYPE html> and html/head/body wrappers
    html = re.sub(r'<!DOCTYPE html>', '', html, flags=re.IGNORECASE)
    html = re.sub(r'<html[^>]*>', '', html, flags=re.IGNORECASE)
    html = re.sub(r'</html>', '', html, flags=re.IGNORECASE)
    html = re.sub(r'<head[^>]*>.*?</head>', '', html, flags=re.IGNORECASE | re.DOTALL)
    html = re.sub(r'<body[^>]*>', '<div className="login-body-wrapper">', html, flags=re.IGNORECASE)
    html = re.sub(r'</body>', '</div>', html, flags=re.IGNORECASE)

    # Generate page.tsx
    react_code = f"""'use client'
import React, { { useEffect } } from 'react'
import Link from 'next/link'

export default function LoginPage() {{
  useEffect(() => {{
    {script_content}
  }}, [])

  return (
    <>
      <div style={{{{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f0f4f0' }}}}>
        {html}
      </div>
    </>
  )
}}
"""
    with open('app/login/page.tsx', 'w', encoding='utf-8') as f:
        f.write(react_code)

if __name__ == "__main__":
    convert()
