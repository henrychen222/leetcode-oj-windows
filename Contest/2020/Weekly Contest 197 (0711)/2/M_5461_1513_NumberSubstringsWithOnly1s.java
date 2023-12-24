// 7.11 night
class M_5461_1513_NumberSubstringsWithOnly1s {
    public int numSub(String s) {
        int cnt = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i)== '1') {
                for (int j = i + 1; j <= s.length(); j++) { // out of bound
                    cnt++;
                    if (s.charAt(j) == '0') {
                        break;
                    }
                }
            }
        }
        return cnt % 1000000007;
    }

    public static void main(String[] args) {
        String s = "0110111";
        String s2 = "101";
        String s3 = "111111";
        String s4 = "000";
        String debug1 = "001010001111111011100101111111010001111111111100110100111011010101011111011101010110000110110011111010111100111010111001111011111000110110011001011010000000111111101001011100110111111100000111110011011001011111110011100000111001110011111100101010111001001111111010010111011001111111010111111111010011001111111001011111001011110100000110100100101100010010001001011010101100110100000001101101100110010011111001110111011011111001100011100111111011111001110011011001110111101001101110111101011011001100011010001100101101111011010000101110110110010100011111101010101101101001111001001111011110001110001011101101111011111111111010101001110111001111010101011100010101110001101100111000110000111011101111111111110111011100000010101001111011110010010111101011001101001110010101010111100111010011111100101111001100111000001010111111110110001011110001011001111";

        M_5461_1513_NumberSubstringsWithOnly1s test = new M_5461_1513_NumberSubstringsWithOnly1s();
        System.out.println(test.numSub(s));
        System.out.println(test.numSub(s2));
        System.out.println(test.numSub(s3));
        System.out.println(test.numSub(s4));
        System.out.println(test.numSub(debug1));
    }
}