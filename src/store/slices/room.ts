import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Room, HotelDetails, RoomsBySerialNo } from '@/types/room'

interface RoomState {
  rooms: Room[]
  hotelDetails: HotelDetails | null
  loading: boolean
  error: string | null
}

const initialState: RoomState = {
  rooms: [],
  hotelDetails: null,
  loading: false,
  error: null,
}

interface RoomsResponse {
  rooms_by_serial_no: RoomsBySerialNo[]
  hotel_details: HotelDetails
}

export const fetchAllRooms = createAsyncThunk('room/fetchAllRooms', async () => {
  const response = await fetch('data/sample.json')
  const data: RoomsResponse = await response.json()

  const flatRooms = data.rooms_by_serial_no.flatMap((group) => group.rooms)

  return {
    rooms: flatRooms,
    hotelDetails: data.hotel_details,
  }
})

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRooms.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchAllRooms.fulfilled,
        (
          state,
          action: PayloadAction<{ rooms: Room[]; hotelDetails: HotelDetails }>,
        ) => {
          state.loading = false
          state.rooms = action.payload.rooms
          state.hotelDetails = action.payload.hotelDetails
        }
      )
      .addCase(fetchAllRooms.rejected, (state) => {
        state.loading = false
        state.error =
          'We are sorry, we are unable to load rooms, try again later.'
      })
  },
})

export default roomSlice.reducer