class Vector {
    constructor(i, j, k) {
        this.i = i;
        this.j = j;
        this.k = k;
    }

    clone() {
        return new Vector(this.i, this.j, this.k);
    }

    set(i, j, k) {
        this.i = i;
        this.j = j;
        this.k = k;

        return this;
    }

    clear() {
        this.set(0, 0, 0);
    }

    add(other) {
        this.i += other.i;
        this.j += other.j;
        this.k += other.k;

        return this;
    }

    sub(other) {
        this.i -= other.i;
        this.j -= other.j;
        this.k -= other.k;

        return this;
    }

    mul(scalar) {
        this.i *= scalar;
        this.j *= scalar;
        this.k *= scalar;

        return this;
    }

    div(scalar) {
        this.i /= scalar;
        this.j /= scalar;
        this.k /= scalar;

        return this;
    }

    lengthSq() {
        return this.i * this.i + this.j * this.j + this.k * this.k;
    }

    length() {
        return Math.sqrt(this.lengthSq());
    }

    normalize() {
        if (this.length() === 0) {
            return this;
        }

        this.div(this.length());
        return this;
    }

    dot(other) {
        return this.i * other.i + this.j * other.j + this.k * other.k;
    }

    cross(other) {
        return new Vector(this.j * other.k - this.k * other.j, this.k * other.i - this.i * other.k, this.i * other.j - this.j * other.i);
    }

    reverse() {
        return this.mul(-1);
    }

    clamp(maxLength) {
        if (this.length() > maxLength) {
            this.normalize().mul(maxLength);
        }

        return this;
    }

    equals(other) {
        return this.i === other.i && this.j === other.j && this.k === other.k;
    }

    toString() {
        return `[${this.i}, ${this.j}, ${this.j}]`;
    }

    toArray() {
        return [this.i, this.j, this.k];
    }

    static cross(vec1, vec2) {
        return new Vector(vec1.j * vec2.k - vec1.k * vec2.j, vec1.k * vec2.i - vec1.i * vec2.k, vec1.i * vec2.j - vec1.j * vec2.i);
    }

    static proj(vec1, vec2) {
        return vec2.clone().mul(vec1.dot(vec2) / vec2.lengthSq());
    }

    static angle(vec1, vec2) {
        const l1 = vec1.length();
		const l2 = vec2.length();
		
        if (l1 === 0 || l2 === 0) {
            return 0;
        } else {
            return Math.acos(vec1.dot(vec2) / (l1 * l2));
        }
    }

    static zero() {
        return new Vector(0, 0, 0);
    }
}
