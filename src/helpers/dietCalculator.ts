interface MeatProductsWeights {
    meatWeight: number;
    offalWeight: number;
    liverWeight: number;
    otherWeight: number;
}

interface Weights {
    targetDogWeight?: number;
    fats: number;
    protein: number;
    meatTotalWeight: number;
    vegetableTotalWeight: number;
    meatProductsWeights: MeatProductsWeights;
}

type ProductType = 'vegetable' | 'meat' | 'offal' | 'liver' | 'other'

interface Product {
    fats: number;
    protein: number;
    weight: number;
    type: ProductType;
}

interface UpdateOutput {
    updatedWeights: Weights,
    percentages: Weights
}

/**
 * calculateTargetValues
 * determine the initial weights of diet elements based on the target weight
 * @param { number } targetWeight - weight we want to achieve
 */
export const calculateTargetValues = (targetDogWeight: number): Weights => {
    const foodWeight = targetDogWeight * 0.03;
    const meatTotalWeight = foodWeight * 0.8;
    const vegetableTotalWeight = foodWeight * 0.2; 
    return {
        targetDogWeight,
        fats: targetDogWeight * 3,
        protein: targetDogWeight * 5,
        meatTotalWeight,
        vegetableTotalWeight,
        meatProductsWeights: {
            meatWeight: meatTotalWeight * 0.6,
            offalWeight: meatTotalWeight * 0.2,
            liverWeight: meatTotalWeight * 0.05,
            otherWeight: meatTotalWeight * 0.15,
        }
    }
}

/**
 * This function should be dispatched when the new product is added, it will take the current state and update the values based on the added product
 * @param { number} targetWeight - target weight used for target values calculation
 * @param { TargetWeights } currentWeights - current weights of previously added elements
 * @param { Product } product - values of this product will be used to update the total state of added elements
 */
export const updateValues = (targetWeight: number, currentWeights: Weights, product: Product): UpdateOutput => {
    const targetValues = calculateTargetValues(targetWeight);
    const updatedWeights = { ...currentWeights };
    if (product.type.valueOf() === 'vegetable') {
        updatedWeights.vegetableTotalWeight += product.weight;
    } else {
        updatedWeights.meatTotalWeight += product.weight;
        switch (product.type) {
            case 'meat': updatedWeights.meatProductsWeights.meatWeight += product.weight; break;
            case 'offal': updatedWeights.meatProductsWeights.offalWeight += product.weight; break;
            case 'liver': updatedWeights.meatProductsWeights.liverWeight += product.weight; break;
            case 'other': updatedWeights.meatProductsWeights.otherWeight += product.weight; break;
        }
    }
    updatedWeights.fats += product.fats;
    updatedWeights.protein += product.protein;
    const percentages = {
        fats: updatedWeights.fats / targetValues.fats * 100,
        protein: updatedWeights.fats / targetValues.protein * 100,
        meatTotalWeight: updatedWeights.meatTotalWeight / targetValues.meatTotalWeight * 100,
        vegetableTotalWeight: updatedWeights.vegetableTotalWeight / targetValues.vegetableTotalWeight * 100,
        meatProductsWeights: {
            meatWeight: updatedWeights.meatProductsWeights.meatWeight / targetValues.meatProductsWeights.meatWeight * 100,
            offalWeight: updatedWeights.meatProductsWeights.offalWeight / targetValues.meatProductsWeights.offalWeight * 100,
            liverWeight: updatedWeights.meatProductsWeights.liverWeight / targetValues.meatProductsWeights.liverWeight * 100,
            otherWeight: updatedWeights.meatProductsWeights.otherWeight / targetValues.meatProductsWeights.otherWeight * 100
        }
    }
    return {
        updatedWeights,
        percentages
    }
}

