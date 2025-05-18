package mywaze.model;

import lombok.AllArgsConstructor;
 import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
public class Line{
    public double x;
    public double y;

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    @Override
    public String toString() {
        return "Line{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
