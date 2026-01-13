import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'CORO - Anonymous Employee Feedback Platform'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  // Fetch the taurus icon
  const iconData = await fetch(
    new URL('../public/icon.png', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 50%, #003D99 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Radial gradient overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,200,255,0.1) 0%, transparent 40%)',
          }}
        />

        {/* Floating message bubbles - top left */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 80,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: 20,
            padding: '12px 20px',
            fontSize: 14,
            color: 'rgba(255,255,255,0.9)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          How do you feel about work? 💬
        </div>

        {/* Floating bubble - top right */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 400,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 16,
            padding: '10px 16px',
            fontSize: 12,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          Anonymous & Secure 🔒
        </div>

        {/* Floating insight bubble */}
        <div
          style={{
            position: 'absolute',
            bottom: 140,
            left: 60,
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 16,
            padding: '10px 18px',
            fontSize: 13,
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          📊 AI-Powered Insights
        </div>

        {/* Main content - left side */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 80,
            paddingRight: 40,
            width: '55%',
          }}
        >
          {/* Logo */}
          <img
            src={`data:image/png;base64,${Buffer.from(iconData).toString('base64')}`}
            width={120}
            height={120}
            style={{
              marginBottom: 24,
              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-2px',
              marginBottom: 12,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            CORO
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 26,
              color: 'rgba(255,255,255,0.95)',
              fontWeight: 600,
              lineHeight: 1.3,
              marginBottom: 20,
            }}
          >
            Anonymous Employee Feedback Platform
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 400,
              marginBottom: 32,
            }}
          >
            Real conversations. Real insights. Real change.
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 20,
                padding: '8px 14px',
                fontSize: 12,
                color: 'white',
                fontWeight: 500,
              }}
            >
              🛡️ SOC 2
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 20,
                padding: '8px 14px',
                fontSize: 12,
                color: 'white',
                fontWeight: 500,
              }}
            >
              🔐 End-to-End Encrypted
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 20,
                padding: '8px 14px',
                fontSize: 12,
                color: 'white',
                fontWeight: 500,
              }}
            >
              ✓ 80% Response Rate
            </div>
          </div>
        </div>

        {/* iPhone mockup - right side */}
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
          }}
        >
          {/* iPhone frame */}
          <div
            style={{
              width: 280,
              height: 560,
              background: 'linear-gradient(145deg, #1a1a1a 0%, #000 100%)',
              borderRadius: 44,
              padding: 12,
              boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Screen */}
            <div
              style={{
                flex: 1,
                background: 'linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 100%)',
                borderRadius: 32,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Status bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '12px 20px 8px',
                  background: '#f5f5f5',
                }}
              >
                {/* Dynamic Island */}
                <div
                  style={{
                    width: 100,
                    height: 28,
                    background: '#000',
                    borderRadius: 20,
                  }}
                />
              </div>

              {/* Chat header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 16px 12px',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                  background: '#f5f5f5',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    background: 'linear-gradient(135deg, #0066FF, #0052CC)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>C</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#000' }}>CORO</span>
                  <span style={{ fontSize: 11, color: '#666' }}>Anonymous Feedback</span>
                </div>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  background: '#fff',
                }}
              >
                {/* Incoming message */}
                <div
                  style={{
                    background: '#e9e9eb',
                    borderRadius: 18,
                    padding: '10px 14px',
                    maxWidth: '85%',
                    fontSize: 14,
                    color: '#000',
                    lineHeight: 1.35,
                  }}
                >
                  Hi! How are you feeling about work this week? 🙂
                </div>

                {/* Outgoing message */}
                <div
                  style={{
                    background: '#0066FF',
                    borderRadius: 18,
                    padding: '10px 14px',
                    maxWidth: '85%',
                    fontSize: 14,
                    color: 'white',
                    alignSelf: 'flex-end',
                    lineHeight: 1.35,
                  }}
                >
                  Pretty good! The new project is exciting
                </div>

                {/* Incoming message */}
                <div
                  style={{
                    background: '#e9e9eb',
                    borderRadius: 18,
                    padding: '10px 14px',
                    maxWidth: '85%',
                    fontSize: 14,
                    color: '#000',
                    lineHeight: 1.35,
                  }}
                >
                  Great to hear! Anything we could improve?
                </div>

                {/* Outgoing message */}
                <div
                  style={{
                    background: '#0066FF',
                    borderRadius: 18,
                    padding: '10px 14px',
                    maxWidth: '85%',
                    fontSize: 14,
                    color: 'white',
                    alignSelf: 'flex-end',
                    lineHeight: 1.35,
                  }}
                >
                  More async communication would help 👍
                </div>

                {/* Typing indicator */}
                <div
                  style={{
                    background: '#e9e9eb',
                    borderRadius: 18,
                    padding: '12px 16px',
                    width: 60,
                    display: 'flex',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: '#999' }} />
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: '#aaa' }} />
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: '#bbb' }} />
                </div>
              </div>

              {/* Input bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px 20px',
                  gap: 8,
                  background: '#f5f5f5',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: 20,
                    padding: '8px 14px',
                    fontSize: 14,
                    color: '#999',
                  }}
                >
                  iMessage
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
