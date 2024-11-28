# Table: rhh_compensatorio

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| cod_emp | char | NO |
| fec_trab | datetime | NO |
| idl_num_trab | bigint | NO |
| fec_cte_trab | datetime | NO |
| fec_liq_trab | datetime | NO |
| valor | money | NO |
| ind_cie_trab | bit | NO |
| idl_num_pag | bigint | YES |
| fec_cte_pag | datetime | YES |
| fec_liq_pag | datetime | YES |
| cod_cont | int | NO |
| ind_cie_pag | bit | NO |
| tip_liq_pag | char | YES |
| ind_dom_Habitual | bit | NO |
