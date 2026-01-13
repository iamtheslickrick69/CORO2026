import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'LoopSync - Anonymous Employee Feedback Platform'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  // Fetch the LoopSync logo
  const logoData = await fetch(
    new URL('../public/loopsync-logo.png', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <img
            src={`data:image/png;base64,${Buffer.from(logoData).toString('base64')}`}
            width={400}
            height={120}
            style={{
              marginBottom: 40,
              objectFit: 'contain',
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#475569',
              textAlign: 'center',
              marginBottom: 24,
            }}
          >
            Anonymous Employee Feedback Platform
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              color: '#94a3b8',
              fontWeight: 400,
              textAlign: 'center',
              marginBottom: 48,
            }}
          >
            Real conversations. Real insights. Real change.
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 24 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#f1f5f9',
                borderRadius: 30,
                padding: '12px 24px',
                fontSize: 16,
                color: '#475569',
                fontWeight: 500,
              }}
            >
              <span style={{ color: '#22c55e' }}>●</span> SOC 2 Certified
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#f1f5f9',
                borderRadius: 30,
                padding: '12px 24px',
                fontSize: 16,
                color: '#475569',
                fontWeight: 500,
              }}
            >
              <span style={{ color: '#3b82f6' }}>●</span> GDPR Compliant
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#f1f5f9',
                borderRadius: 30,
                padding: '12px 24px',
                fontSize: 16,
                color: '#475569',
                fontWeight: 500,
              }}
            >
              <span style={{ color: '#8b5cf6' }}>●</span> 256-bit Encrypted
            </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #0066FF 0%, #0052CC 100%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
