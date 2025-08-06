export function calculateValueChangePercent(valueAtDate: number, currentValue: number): number {
    if (valueAtDate === 0) {
        throw new Error('valueAtDate cannot be zero');
    }
    return ((currentValue - valueAtDate) / valueAtDate) * 100;
}
