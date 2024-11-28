# Table: OfertasFinanciacionReferenciasBancarias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoOfertasFinanciacion | nvarchar | NO |
| PkFkSeries_OfertasFinanciacion | nvarchar | NO |
| PkFkNumOfertasFinanciacion | int | NO |
| PkOfertasFinanciacionReferenciasBancarias_Iden | smallint | NO |
| Banco | nvarchar | YES |
| Sucursal | nvarchar | YES |
| Cuenta | nvarchar | YES |
| TituloValor | nvarchar | YES |
| Entidad | nvarchar | YES |
| Valor | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Antiguedad | nvarchar | YES |
| CreditosAprobados | nvarchar | YES |
| CreditosVigentes | nvarchar | YES |
