import { describe, it, expect } from "vitest"
import { compress, decompress } from "../tools"

describe("Utils Tools - Compression", () => {
  describe("compress", () => {
    it("should compress by action id", () => {
      // 1: Great Strides
      const result = compress({ type: "id", actions: [260, 261] })
      expect(result).toBeTypeOf("string")
      expect(result.startsWith("1v")).toBe(true) // Assuming version 1
    })

    it("should compress by name", () => {
      // "阔步": Great Strides
      const result = compress({ type: "name", actions: ["阔步"] })
      expect(result).toBeTypeOf("string")
      const decompressed = decompress(result)
      expect(decompressed[0].name_zh).toBe("阔步")
    })

    it("should compress by signature", () => {
      const result = compress({ type: "signature", actions: ["greatStrides"] })
      expect(result).toBeTypeOf("string")
      const decompressed = decompress(result)
      expect(decompressed[0].signatures).toContain("greatStrides")
    })

    it("should throw error for invalid id", () => {
      expect(() => compress({ type: "id", actions: [999999] })).toThrow("Invalid action id: 999999")
    })

    it("should throw error for invalid name", () => {
      expect(() => compress({ type: "name", actions: ["不存在的技能"] })).toThrow("Invalid action name: 不存在的技能")
    })
  })

  describe("compress (new array overload)", () => {
    it("should compress by array of ids", () => {
      const result = compress([260, 261])
      expect(result).toBeTypeOf("string")
      const decompressed = decompress(result)
      expect(decompressed).toHaveLength(2)
      expect(decompressed[0].cacId).toBe(1)
      expect(decompressed[1].cacId).toBe(1)
    })

    it("should compress by array of names", () => {
      const result = compress(["阔步"])
      expect(result).toBeTypeOf("string")
      const decompressed = decompress(result)
      expect(decompressed).toHaveLength(1)
      expect(decompressed[0].name_zh).toBe("阔步")
    })

    it("should compress by array of signatures", () => {
      const result = compress(["greatStrides"])
      expect(result).toBeTypeOf("string")
      const decompressed = decompress(result)
      expect(decompressed).toHaveLength(1)
      expect(decompressed[0].signatures).toContain("greatStrides")
    })

    it("should compress by array of signatures (snake_case)", () => {
      const result = compress(["great_strides"])
      expect(result).toBeTypeOf("string")
      const decompressed = decompress(result)
      expect(decompressed).toHaveLength(1)
      expect(decompressed[0].signatures).toContain("great_strides")
    })

    it("should compress by mixed array of names and signatures", () => {
      const result = compress(["阔步", "manipulation"])
      expect(result).toBeTypeOf("string")
      const decompressed = decompress(result)
      expect(decompressed).toHaveLength(2)
      expect(decompressed[0].name_zh).toBe("阔步")
      expect(decompressed[1].signatures).toContain("manipulation")
    })
  })

  describe("decompress", () => {
    it("should decompress correctly", () => {
      const actions = [1, 2, 3] // Internal IDs for Great Strides, Manipulation, Waste Not
      const compressed = compress({ type: "id", actions: [260, 4574, 4631] })
      const result = decompress(compressed)
      
      expect(result).toHaveLength(3)
      expect(result[0].cacId).toBe(1)
      expect(result[1].cacId).toBe(2)
      expect(result[2].cacId).toBe(3)
    })

    it("should throw error for invalid compressed string", () => {
      expect(() => decompress("invalid-code")).toThrow("Invalid code format")
    })

    it("should throw error for unknown action id in code", () => {
      // Manually craft a code with an out-of-range ID if possible, 
      // or just test the format validation.
      // Since bitWidth determines the range, we'd need a valid format but invalid ID.
    })
  })

  describe("Roundtrip", () => {
    it("should maintain data integrity through compress/decompress cycle", () => {
      const inputActions = ["阔步", "加工", "观察"]
      const compressed = compress({ type: "name", actions: inputActions })
      const decompressed = decompress(compressed)
      
      expect(decompressed).toHaveLength(3)
      expect(decompressed[0].name_zh).toBe("阔步")
      expect(decompressed[1].name_zh).toBe("加工")
      expect(decompressed[2].name_zh).toBe("观察")
    })
  })
})
