# Table: Presupuestos_Jerarquias_USC

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdJerarquia | smallint | NO |
| Nivel1 | smallint | NO |
| Nivel2 | smallint | NO |
| Nivel3 | smallint | NO |
| Nivel4 | smallint | NO |
| Nivel5 | smallint | NO |
| Nivel6 | smallint | NO |
| CodigoConcepto | smallint | NO |
| NombreConcepto | nvarchar | NO |
| Editable | bit | NO |
| ColorFondo | varchar | YES |
| ColorLetra | varchar | YES |
| Negrilla | bit | YES |
| UnidadDeMedidaCalculo | nvarchar | YES |
| IdJerarquiaDependencia | smallint | YES |
| DescripcionFormula | nvarchar | YES |
