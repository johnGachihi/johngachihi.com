import dayjs from "dayjs"

function formatDate(dateString: string, format: string): string {
  return dayjs(dateString).format(format)
}

export { formatDate }