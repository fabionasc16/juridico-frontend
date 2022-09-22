<template>
   <b-form-input class="bordered margin-field" 
    ref="inputRef"
    type="text"
    placeholder="R$ 00,00"    
  />
</template>

<!---
Referencias 
https://dm4t2.github.io/vue-currency-input/guide.html#use-the-custom-component
https://stackoverflow.com/questions/68883060/vuejs-input-witdh-mask-new-money
https://dm4t2.github.io/vue-currency-input/playground.html
-->

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number, // Vue 2: value
    options: Object
  },
  data() {
      return {
        /* optionsSetup: {
            locale: 'pt-BR', //locale: 'nl-NL',
            currency: 'BRL',
            //currencyDisplay: 'hidden',
            precision: 2,
            hideCurrencySymbolOnFocus: true,
            hideGroupingSeparatorOnFocus: true,
            hideNegligibleDecimalDigitsOnFocus: true,
            autoDecimalDigits: false,
            exportValueAsInteger: false,
            autoSign: false,
            useGrouping: true
        }*/ 
      }
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options)

    return { inputRef }
  }
}
</script>