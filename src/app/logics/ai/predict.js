import nlp from 'compromise';
import { useEffect, useState } from 'react';

class CategoryPredictor {
    constructor() {
        this.localStorageKeyEn = 'categoryWeights_en';
        this.localStorageKeyHi = 'categoryWeights_hi';
        this.inMemoryStorage = {};
        
        this.init();
    }

    init() {
        this.categoryWeights_en = this.loadWeightsFromStorage(this.localStorageKeyEn);
        this.categoryWeights_hi = this.loadWeightsFromStorage(this.localStorageKeyHi);

        if (!this.categoryWeights_en) {
            this.loadAndSaveWeights('en');
        }
        if (!this.categoryWeights_hi) {
            this.loadAndSaveWeights('hi');
        }
    }

    async loadAndSaveWeights(lang) {
        let weights;
        try {
            switch (lang) {
                case 'hi':
                    weights = (await import('./model_hi')).wordWeights;
                    this.saveWeightsToStorage(this.localStorageKeyHi, weights);
                    this.categoryWeights_hi = weights;
                    break;
                case 'en':
                default:
                    weights = (await import('./model_en')).wordWeights;
                    this.saveWeightsToStorage(this.localStorageKeyEn, weights);
                    this.categoryWeights_en = weights;
                    break;
            }
        } catch (error) {
            console.error(`Error importing weights for ${lang}:`, error);
        }
    }

    saveWeightsToStorage(key, weights) {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(weights));
            } else {
                this.inMemoryStorage[key] = JSON.stringify(weights);
            }
        } catch (error) {
            console.error('Error saving weights to storage:', error);
        }
    }

    loadWeightsFromStorage(key) {
        try {
            if (typeof localStorage !== 'undefined') {
                const weights = localStorage.getItem(key); 
                
                return weights ? JSON.parse(weights) : null;
            } else {
                const weights = this.inMemoryStorage[key];
                return weights ? JSON.parse(weights) : null;
            }
        } catch (error) {
            console.error('Error loading weights from storage:', error);
            return null;
        }
    }

    preprocessText(text, lang = 'en') {
        let doc;
        switch (lang) {
            case 'hi':
                doc = nlp(text.toLowerCase());
                break;
            case 'en':
            default:
                doc = nlp(text.toLowerCase());
                break;
        }
        const words = doc.terms().out('array');
        return words;
    }

    addNgrams(words, n) {
        const ngrams = [];
        for (let i = 0; i < words.length - n + 1; i++) {
            ngrams.push(words.slice(i, i + n).join(' '));
        }
        return ngrams;
    }

    calculateTermFrequency(terms) {
        const termFreq = {};
        terms.forEach(term => {
            if (!termFreq[term]) {
                termFreq[term] = 0;
            }
            termFreq[term]++;
        });
        return termFreq;
    }

    async predictTop3Categories(quote, lang = 'en', withProbabilities = false) {
        if (lang === 'en' && !this.categoryWeights_en) {
            await this.loadAndSaveWeights('en');
        } else if (lang === 'hi' && !this.categoryWeights_hi) {
            await this.loadAndSaveWeights('hi');
        }

        const words = this.preprocessText(quote, lang);
        const ngrams = [];
        for (let i = 1; i <= 8; i++) {
            ngrams.push(...this.addNgrams(words, i));
        }
        const allTerms = ngrams;

        const termFreq = this.calculateTermFrequency(allTerms);
        const categoryScores = {};
        
        let categoryWeights;
        switch (lang) {
            case 'hi':
                categoryWeights = this.categoryWeights_hi;
                break;
            case 'en':
            default:
                categoryWeights = this.categoryWeights_en;
                break;
        }

        for (const category in categoryWeights) {
            categoryScores[category] = 0;
            for (const term in termFreq) {
                if (categoryWeights[category][term]) {
                    categoryScores[category] += categoryWeights[category][term] * termFreq[term];
                }
            }
        }

        const sortedCategories = Object.keys(categoryScores).sort((a, b) => categoryScores[b] - categoryScores[a]);
        const top3Categories = sortedCategories.slice(0, 3);
        if (!withProbabilities) {
            return top3Categories;
        }

        const totalScore = top3Categories.reduce((sum, category) => sum + categoryScores[category], 0);

        const top3WithProbabilities = top3Categories.map((category) => ({
            category,
            probability: ((categoryScores[category] / totalScore) * 100).toFixed(2)
        }));

        return top3WithProbabilities;
    }
}

export const useCategoryPredictor = () => {
    const [predictor, setPredictor] = useState(null);

    useEffect(() => {
        const initializePredictor = async () => {
            const instance = new CategoryPredictor();
            await instance.init();
            setPredictor(instance);
        };

        initializePredictor();
    }, []);

    return predictor;
};
