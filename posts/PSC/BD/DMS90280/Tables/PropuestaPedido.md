# Table: PropuestaPedido

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPropuestaPedido_Iden | int | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkMR | nvarchar | NO |
| FkEmpleados | smallint | NO |
| FechaAlta | datetime | NO |
| FechaFin | datetime | YES |
| Observacion | nvarchar | YES |
| Demanda1 | smallint | NO |
| Demanda2 | smallint | NO |
| Demanda3 | smallint | NO |
| PuntoMax | decimal | NO |
| PuntoMin | decimal | NO |
| PuntoRound | decimal | YES |
| FechaMovDesde | datetime | YES |
| FechaMovHasta | datetime | YES |
| ImportePedidoMax | decimal | YES |
| FkEmpleados_EnCurso | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| IncluirEquivalencias | bit | NO |
| IncluirTraspasosSalida | bit | NO |
| DiasVigencia | smallint | NO |
| FkTarifas | tinyint | NO |
| DescripcionParamDef | nvarchar | NO |
| PesoDemanda1 | decimal | NO |
| PesoDemanda2 | decimal | NO |
| PesoDemanda3 | decimal | NO |
| PropuestaPorIdClasif | nvarchar | NO |
