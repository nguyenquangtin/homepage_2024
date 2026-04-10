import { Box, Text, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useSiteTheme } from '../lib/site-theme-context'

// Animated stat bar (fills on mount)
const StatBar = ({ label, value, max = 100, color, accent, text }) => (
  <Flex align="center" gap={2} mb={1.5}>
    <Text fontSize="10px" fontFamily="monospace" color={accent} w="30px" letterSpacing="0.05em">
      {label}
    </Text>
    <Box flex={1} h="7px" bg="rgba(255,255,255,0.08)" borderRadius="sm" overflow="hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        style={{ height: '100%', background: color, borderRadius: '2px' }}
      />
    </Box>
    <Text fontSize="10px" fontFamily="monospace" color={text} w="24px" textAlign="right">
      {value}
    </Text>
  </Flex>
)

// Cycling gauge bar — used for ATB/Cooldown and Trance/Psi Surge
const CyclingBar = ({ label, color, gradient, duration, symbol, times }) => (
  <Flex align="center" gap={2} mt={1}>
    <Text fontSize="10px" fontFamily="monospace" color={color} w="30px">{label}</Text>
    <Box flex={1} h="7px" bg="rgba(255,255,255,0.08)" borderRadius="sm" overflow="hidden">
      <motion.div
        animate={{ width: ['0%', '100%', '100%', '0%'], ...(label === 'TRN' || label === 'PSI' ? { opacity: [0.8, 1, 0.4, 0.8] } : {}) }}
        transition={{ repeat: Infinity, duration, times: times || [0, 0.65, 0.9, 1], ease: label === 'ATB' || label === 'CDN' ? 'linear' : 'easeInOut' }}
        style={{ height: '100%', background: gradient, borderRadius: '2px' }}
      />
    </Box>
    <Text fontSize="10px" fontFamily="monospace" color={color} w="24px" textAlign="right">
      {symbol}
    </Text>
  </Flex>
)

const THEME_DATA = {
  ffix: {
    header: '◆ CHARACTER',
    job: 'BLACK MAGE',
    hp: { current: 3780, max: 5400, color: '#00cc55', gradient: 'linear-gradient(90deg,#009933,#00ff55)' },
    resource: { label: 'MP', current: 663, max: 720, color: '#bb77ff', gradient: 'linear-gradient(90deg,#7722cc,#bb66ff)' },
    atb: { label: 'ATB', color: '#ffcc00', gradient: '#ffcc00', duration: 3.2 },
    surge: { label: 'TRN', color: '#cc88ff', gradient: 'linear-gradient(90deg,#7722cc,#cc66ff)', duration: 12, symbol: '✦', times: [0, 0.78, 0.92, 1] },
    stats: [
      { label: 'MAG', value: 92, color: '#aa66ff' },
      { label: 'SPI', value: 85, color: '#44ccff' },
      { label: 'SPD', value: 76, color: '#ffcc00' },
      { label: 'VIT', value: 64, color: '#00cc55' },
      { label: 'STR', value: 58, color: '#ff8844' },
    ],
    currency: 'GIL',
    currencyValue: '8,888,888',
    currencyColor: '#ffd700',
  },
  sc2: {
    header: '◆ COMMANDER',
    job: 'HIGH TEMPLAR',
    hp: { current: 4000, max: 4000, color: '#00cc55', gradient: 'linear-gradient(90deg,#009933,#00ff55)' },
    resource: { label: 'NRG', current: 150, max: 200, color: '#00ddff', gradient: 'linear-gradient(90deg,#0088aa,#00ddff)' },
    atb: { label: 'CDN', color: '#00ddff', gradient: '#00ddff', duration: 3.2 },
    surge: { label: 'PSI', color: '#00aaff', gradient: 'linear-gradient(90deg,#0055aa,#00bbff)', duration: 12, symbol: '⚡', times: [0, 0.78, 0.92, 1] },
    stats: [
      { label: 'PSI', value: 95, color: '#00ddff' },
      { label: 'INT', value: 88, color: '#00aaff' },
      { label: 'SPD', value: 76, color: '#ffcc00' },
      { label: 'CON', value: 64, color: '#00cc55' },
      { label: 'STR', value: 55, color: '#ff8844' },
    ],
    currency: 'MIN',
    currencyValue: '8,888',
    currencyColor: '#00ddff',
    currency2: 'GAS',
    currency2Value: '4,444',
    currency2Color: '#22cc66',
  },
}

const FfixCharSheet = () => {
  const { theme, palette } = useSiteTheme()
  const d = THEME_DATA[theme]
  const { accent, text: textColor, panelBg, muted, jobColor } = palette

  return (
    <Box
      bg={panelBg}
      border={`2px solid ${accent}`}
      borderRadius="sm"
      boxShadow={`0 0 0 3px rgba(8,14,40,0.9), 0 0 0 5px ${accent}33`}
      overflow="hidden"
      fontFamily="monospace"
    >
      <Box px={4} py={2} bg={palette.headerBg} borderBottom={`1px solid ${palette.headerBorder}`}>
        <Text fontSize="10px" color={accent} letterSpacing="0.15em">{d.header}</Text>
      </Box>

      <Box px={4} py={3}>
        {/* Name + Job */}
        <Flex justify="space-between" align="baseline" mb={3} pb={2} borderBottom={`1px solid ${accent}33`}>
          <Box>
            <Text fontSize="10px" color={muted} letterSpacing="0.1em" mb={0.5}>NAME</Text>
            <Text color={textColor} fontWeight="bold" fontSize="sm" letterSpacing="0.06em">TONY TIN NGUYEN</Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="10px" color={muted} letterSpacing="0.1em" mb={0.5}>JOB</Text>
            <Text color={jobColor} fontSize="xs" fontWeight="bold" letterSpacing="0.04em">{d.job}</Text>
          </Box>
        </Flex>

        {/* HP + Resource row */}
        <Flex gap={3} mb={3}>
          <Box flex={1}>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="10px" color={accent}>HP</Text>
              <Text fontSize="10px" color={d.hp.color}>{d.hp.current}/{d.hp.max}</Text>
            </Flex>
            <Box h="6px" bg="rgba(255,255,255,0.08)" borderRadius="sm" overflow="hidden">
              <Box h="full" w={`${(d.hp.current / d.hp.max) * 100}%`} bg={d.hp.gradient} />
            </Box>
          </Box>
          <Box flex={1}>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="10px" color={accent}>{d.resource.label}</Text>
              <Text fontSize="10px" color={d.resource.color}>{d.resource.current}/{d.resource.max}</Text>
            </Flex>
            <Box h="6px" bg="rgba(255,255,255,0.08)" borderRadius="sm" overflow="hidden">
              <Box h="full" w={`${(d.resource.current / d.resource.max) * 100}%`} bg={d.resource.gradient} />
            </Box>
          </Box>
        </Flex>

        <CyclingBar label={d.atb.label} color={d.atb.color} gradient={d.atb.gradient} duration={d.atb.duration} symbol="▶" />
        <CyclingBar {...d.surge} />

        <Box borderTop={`1px solid ${accent}33`} my={3} />

        <Text fontSize="10px" color={muted} letterSpacing="0.12em" mb={2}>◆ ATTRIBUTES</Text>
        {d.stats.map(s => (
          <StatBar key={s.label} {...s} accent={accent} text={textColor} />
        ))}

        {/* LV + EXP */}
        <Flex justify="space-between" mt={3} pt={2} borderTop={`1px solid ${accent}33`}>
          <Text fontSize="10px" color={accent}>LV <Text as="span" color={textColor}>39</Text></Text>
          <Text fontSize="10px" color={muted}>EXP <Text as="span" color={textColor}>19 YRS</Text></Text>
        </Flex>

        {/* Currency */}
        <Flex justify="flex-end" mt={1.5} gap={3}>
          <Text fontSize="10px" color={accent} letterSpacing="0.05em">
            {d.currency} <Text as="span" color={d.currencyColor} fontWeight="bold">{d.currencyValue}</Text>
          </Text>
          {d.currency2 && (
            <Text fontSize="10px" color={accent} letterSpacing="0.05em">
              {d.currency2} <Text as="span" color={d.currency2Color} fontWeight="bold">{d.currency2Value}</Text>
            </Text>
          )}
        </Flex>
      </Box>
    </Box>
  )
}

export default FfixCharSheet
