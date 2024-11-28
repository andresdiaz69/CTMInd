# Stored Procedure: PA_Portal_Familiares_HV

## Usa los objetos:
- [[gen_parentesco]]
- [[gen_tipide]]
- [[gth_estcivil]]
- [[GTH_Genero]]
- [[GTH_Ocupacion]]
- [[rhh_emplea]]
- [[rhh_familia]]
- [[rhh_portal_familia]]
- [[rhh_tbclaest]]

```sql

-- =============================================
-- Author:		Alexander Vargas
-- Create date: 15/01/2018
-- Description:	Consulta los campos que cambiaron para un familiar en particular
--SRS2021-0269 No muestra ventana autorizacion familiar
--Modify by:	Alexander Vargas
--Modify date:	25/03/2021
--Description:	se identifica que sucede con  documentos de 
--				mas de 10 digitos. Se aumenta a 12
--SPA agregar campos a HV Empleados y candidatos
--Modified by: Alexander Vargas
--Modified date:	08/05/2023
--Description: se agregan el campo ind_adulto_mayor a la consulta 
--de familiares
-- =============================================
CREATE PROCEDURE [dbo].[PA_Portal_Familiares_HV] @cod_emp CHAR(12) = NULL, 
                                                @cod_ced CHAR(12) = NULL, 
                                                @opc     CHAR(1)  = 'A'  --A-ACTUALIZA, N-NUEVO
--WITH ENCRYPTION	
AS
    BEGIN
        IF(@opc = 'A')
            BEGIN
                SELECT CONVERT(VARCHAR(255), EXT.Descripcion) AS Descripcion, 
                       CONVERT(VARCHAR(255), TN.cod_emp) AS cod_emp, 
                       CONVERT(VARCHAR(255), TN.campo) AS Campo, 
                       CONVERT(VARCHAR(255), valor_actual) AS valor_actual, 
                       CONVERT(VARCHAR(255), valor_nuevo) AS valor_nuevo
                FROM
                (
                    SELECT A.cod_emp, 
                           RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', 
                           RTRIM(A.nom_fam) + ' ' + RTRIM(A.ap1_fam) + ' ' + ISNULL(RTRIM(A.ap2_fam), '') AS nombre_fam, 
                           CAST(D.nom_par AS VARCHAR(255)) AS nom_par, 
                           A.gra_san, 
                           CAST(IIF(A.est_civ IS NULL, '', RTRIM(A.est_civ) + '_' + H.des_est) AS VARCHAR(255)) AS est_civ, 
                           CAST(RTRIM(A.niv_est) + '_' + G.des_est AS VARCHAR(255)) AS niv_est, 
                           CAST(RTRIM(A.tip_fam) + '_' + J.nom_par AS VARCHAR(255)) AS tip_fam, 
                           E.des_tip, 
                           CAST(A.num_ced AS VARCHAR(255)) AS num_ced, 
                           CAST(FORMAT(A.fec_nac, 'dd/MM/yyyy') AS VARCHAR(255)) AS fec_nac, 
                           CAST(A.nom_fam AS VARCHAR(255)) AS nom_fam, 
                           CAST(A.ap1_fam AS VARCHAR(255)) AS ap1_fam, 
                           CAST(A.ap2_fam AS VARCHAR(255)) AS ap2_fam, 
                           CAST(RTRIM(A.sex_fam) + '_' + Gen.des_gen AS VARCHAR(255)) AS sex_fam,
                           CASE A.sex_fam
                               WHEN 1
                               THEN 'Femenino'
                               WHEN 2
                               THEN 'Masculino'
                           END AS dessex_fam, 
                           H.des_est AS 'des_estCiv', 
                           G.des_est, 
                           F.des_ocu, 
                           CAST(A.sal_bas AS VARCHAR(255)) AS sal_bas, 
                           CAST(IIF(A.ocu_fam IS NULL, '', (RTRIM(A.ocu_fam) + '_' + f.des_ocu)) AS VARCHAR(255)) AS ocu_fam, 
                           CAST(IIF(A.ind_sub = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_sub, 
                           CAST(IIF(A.ind_comp = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_comp, 
                           CAST(IIF(A.ind_pro = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_pro, 
                           CAST(IIF(A.ind_conv = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_conv, 
                           CAST(IIF(A.ind_adulto_mayor = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_adulto_mayor, 
                           IIF(C.cod_emp IS NULL, 'Nuevo', '') AS TipoCambio 
                    --===================================
                    FROM rhh_portal_familia A
                         INNER JOIN rhh_emplea B ON A.cod_emp = B.cod_emp COLLATE DATABASE_DEFAULT
                         LEFT JOIN rhh_familia C ON A.cod_emp = C.cod_emp COLLATE DATABASE_DEFAULT
                                                    AND A.num_ced = C.num_ced COLLATE DATABASE_DEFAULT
                         LEFT JOIN gen_parentesco D ON A.tip_fam = D.cod_par COLLATE DATABASE_DEFAULT
                         LEFT JOIN gen_tipide E ON E.cod_tip = A.tip_ide COLLATE DATABASE_DEFAULT
                         LEFT JOIN GTH_Ocupacion F ON F.cod_ocu = A.ocu_fam
                         LEFT JOIN rhh_tbclaest G ON G.tip_est = A.niv_est COLLATE DATABASE_DEFAULT
                         LEFT JOIN gth_estcivil H ON A.est_civ = H.cod_est
                         LEFT JOIN gth_estcivil I ON C.est_civ = I.cod_est
                         LEFT JOIN gen_parentesco J ON A.tip_fam = J.cod_par COLLATE DATABASE_DEFAULT
                         LEFT JOIN rhh_tbclaest K ON K.tip_est = C.niv_est COLLATE DATABASE_DEFAULT
                         LEFT JOIN GTH_Ocupacion L ON L.cod_ocu = C.ocu_fam
                         LEFT JOIN GTH_Genero Gen ON Gen.cod_gen = A.sex_fam
                    WHERE A.cod_emp = @cod_emp
                          AND A.num_ced = @cod_ced
                ) P UNPIVOT(valor_nuevo FOR campo IN(nom_fam, 
                                                     ap1_fam, 
                                                     ap2_fam, 
                                                     fec_nac, 
                                                     est_civ, 
                                                     sal_bas, 
                                                     ind_sub, 
                                                     ocu_fam, 
                                                     niv_est, 
                                                     ind_comp, 
                                                     tip_fam, 
                                                     sex_fam, 
                                                     ind_conv, 
                                                     ind_pro, 
                                                     ind_adulto_mayor)) AS TN
                LEFT JOIN
                (
                    SELECT *
                    FROM
                    (
                        SELECT A.cod_emp, 
                               RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', 
                               RTRIM(A.nom_fam) + ' ' + RTRIM(A.ap1_fam) + ' ' + ISNULL(RTRIM(A.ap2_fam), '') AS nombre_fam, 
                               CAST(D.nom_par AS VARCHAR(255)) AS nom_par, 
                               A.gra_san, 
                               CAST(IIF(A.est_civ IS NULL, '', RTRIM(A.est_civ) + '_' + H.des_est) AS VARCHAR(255)) AS est_civ, 
                               CAST(IIF(A.niv_est IS NULL, '', RTRIM(A.niv_est) + '_' + G.des_est) AS VARCHAR(255)) AS niv_est, 
                               CAST(RTRIM(A.tip_fam) + '_' + J.nom_par AS VARCHAR(255)) AS tip_fam, 
                               E.des_tip, 
                               CAST(A.num_ced AS VARCHAR(255)) AS num_ced, 
                               CAST(FORMAT(A.fec_nac, 'dd/MM/yyyy') AS VARCHAR(255)) AS fec_nac, 
                               CAST(A.nom_fam AS VARCHAR(255)) AS nom_fam, 
                               CAST(A.ap1_fam AS VARCHAR(255)) AS ap1_fam, 
                               CAST(A.ap2_fam AS VARCHAR(255)) AS ap2_fam, 
                               CAST(IIF(A.sex_fam IS NULL, '', RTRIM(A.sex_fam) + '_' + Gen.des_gen) AS VARCHAR(255)) AS sex_fam,
                               CASE A.sex_fam
                                   WHEN 1
                                   THEN 'Femenino'
                                   WHEN 2
                                   THEN 'Masculino'
                               END AS dessex_fam, 
                               H.des_est AS 'des_estCiv', 
                               G.des_est, 
                               F.des_ocu, 
                               CAST(ISNULL(A.sal_bas, '') AS VARCHAR(255)) AS sal_bas, 
                               CAST(IIF(A.ocu_fam IS NULL, '', (RTRIM(A.ocu_fam) + '_' + f.des_ocu)) AS VARCHAR(255)) AS ocu_fam, 
                               CAST(IIF(A.ind_sub = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_sub, 
                               CAST(IIF(A.ind_comp = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_comp, 
                               CAST(IIF(A.ind_pro = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_pro, 
                               CAST(IIF(A.ind_conv = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_conv, 
                               CAST(IIF(A.ind_adulto_mayor = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_adulto_mayor,
                               --Campos para comparar con los nuevos
                               C.cod_emp AS 'T.cod_emp', 
                               RTRIM(C.nom_fam) + ' ' + RTRIM(C.ap1_fam) + ' ' + RTRIM(C.ap2_fam) AS 'T.nom_fam', 
                               J.nom_par AS 'T.nom_par', 
                               C.gra_san AS 'T.gra_san', 
                               C.fec_nac AS 'T.fec_nac', 
                               C.sex_fam AS 'T.sex_fam', 
                               I.des_est AS 'T.des_estCiv', 
                               k.des_est AS 'T.des_est', 
                               C.ind_comp AS 'T.ind_comp', 
                               L.des_ocu AS 'T.des_ocu', 
                               C.sal_bas AS 'T.sal_bas', 
                               C.ind_sub AS 'T.ind_sub', 
                               C.ind_pro AS 'T.ind_pro', 
                               C.ind_conv AS 'T.ind_conv', 
                               IIF(C.cod_emp IS NULL, 'Nuevo', '') AS TipoCambio 
                        --===================================
                        FROM rhh_familia A
                             INNER JOIN rhh_emplea B ON A.cod_emp = B.cod_emp
                             LEFT JOIN rhh_portal_familia C ON A.cod_emp = C.cod_emp COLLATE DATABASE_DEFAULT
                                                               AND A.num_ced = C.num_ced COLLATE DATABASE_DEFAULT
                             LEFT JOIN gen_parentesco D ON A.tip_fam = D.cod_par COLLATE DATABASE_DEFAULT
                             LEFT JOIN gen_tipide E ON E.cod_tip = A.tip_ide COLLATE DATABASE_DEFAULT
                             LEFT JOIN GTH_Ocupacion F ON F.cod_ocu = A.ocu_fam
                             LEFT JOIN rhh_tbclaest G ON G.tip_est = A.niv_est COLLATE DATABASE_DEFAULT
                             LEFT JOIN gth_estcivil H ON A.est_civ = H.cod_est
                             LEFT JOIN gth_estcivil I ON C.est_civ = I.cod_est
                             LEFT JOIN gen_parentesco J ON A.tip_fam = J.cod_par COLLATE DATABASE_DEFAULT
                             LEFT JOIN rhh_tbclaest K ON K.tip_est = C.niv_est COLLATE DATABASE_DEFAULT
                             LEFT JOIN GTH_Ocupacion L ON L.cod_ocu = C.ocu_fam
                             LEFT JOIN GTH_Genero Gen ON Gen.cod_gen = A.sex_fam
                        WHERE A.cod_emp = @cod_emp
                              AND A.num_ced = @cod_ced
                    ) P UNPIVOT(valor_actual FOR campo IN(nom_fam, 
                                                          ap1_fam, 
                                                          ap2_fam, 
                                                          fec_nac, 
                                                          est_civ, 
                                                          sal_bas, 
                                                          ind_sub, 
                                                          ocu_fam, 
                                                          niv_est, 
                                                          ind_comp, 
                                                          tip_fam, 
                                                          sex_fam, 
                                                          ind_conv, 
                                                          ind_pro, 
                                                          ind_adulto_mayor)) AS TA2
                ) AS TA ON TA.campo = TN.CAMPO --AND TA.valor_actual<>TN.valor_nuevo 

                INNER JOIN
                (
                    SELECT c.name AS Campo, 
                           value AS Descripcion
                    FROM sys.extended_properties AS ep
                         INNER JOIN sys.tables AS t ON ep.major_id = t.object_id
                         INNER JOIN sys.columns AS c ON ep.major_id = c.object_id
                                                        AND ep.minor_id = c.column_id
                    WHERE class = 1
                          AND t.name = 'rhh_portal_familia'
                ) AS EXT ON TN.campo = EXT.Campo
                WHERE RTRIM(valor_actual) <> RTRIM(valor_nuevo);
            END;
        IF(@opc = 'N') --NUEVOS REGISTROS
            BEGIN
                SELECT CONVERT(VARCHAR(255), EXT.Descripcion) AS Descripcion, 
                       CONVERT(VARCHAR(255), TN.cod_emp) AS cod_emp, 
                       CONVERT(VARCHAR(255), TN.campo) AS Campo, 
                       CONVERT(VARCHAR(255), valor_actual) AS valor_actual, 
                       CONVERT(VARCHAR(255), valor_nuevo) AS valor_nuevo
                FROM
                (
                    SELECT A.cod_emp, 
                           RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', 
                           RTRIM(A.nom_fam) + ' ' + RTRIM(A.ap1_fam) + ' ' + ISNULL(RTRIM(A.ap2_fam), '') AS nombre_fam, 
                           CAST(D.nom_par AS VARCHAR(255)) AS nom_par, 
                           A.gra_san, 
                           CAST(IIF(A.est_civ IS NULL, '', RTRIM(A.est_civ) + '_' + H.des_est) AS VARCHAR(255)) AS est_civ, 
                           CAST(RTRIM(A.niv_est) + '_' + G.des_est AS VARCHAR(255)) AS niv_est, 
                           CAST(RTRIM(A.tip_fam) + '_' + J.nom_par AS VARCHAR(255)) AS tip_fam, 
                           E.des_tip, 
                           CAST(A.num_ced AS VARCHAR(255)) AS num_ced, 
                           CAST(FORMAT(A.fec_nac, 'dd/MM/yyyy') AS VARCHAR(255)) AS fec_nac, 
                           CAST(A.nom_fam AS VARCHAR(255)) AS nom_fam, 
                           CAST(A.ap1_fam AS VARCHAR(255)) AS ap1_fam, 
                           CAST(A.ap2_fam AS VARCHAR(255)) AS ap2_fam, 
                           CAST(RTRIM(A.sex_fam) + '_' + Gen.des_gen AS VARCHAR(255)) AS sex_fam,
                           CASE A.sex_fam
                               WHEN 1
                               THEN 'Femenino'
                               WHEN 2
                               THEN 'Masculino'
                           END AS dessex_fam, 
                           H.des_est AS 'des_estCiv', 
                           G.des_est, 
                           F.des_ocu, 
                           CAST(A.sal_bas AS VARCHAR(255)) AS sal_bas, 
                           CAST(IIF(A.ocu_fam IS NULL, '', (RTRIM(A.ocu_fam) + '_' + f.des_ocu)) AS VARCHAR(255)) AS ocu_fam, 
                           CAST(IIF(A.ind_sub = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_sub, 
                           CAST(IIF(A.ind_comp = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_comp, 
                           CAST(IIF(A.ind_pro = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_pro, 
                           CAST(IIF(A.ind_conv = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_conv, 
                           CAST(IIF(A.ind_adulto_mayor = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_adulto_mayor, 
                           IIF(C.cod_emp IS NULL, 'Nuevo', '') AS TipoCambio 
                    --===================================
                    FROM rhh_portal_familia A
                         INNER JOIN rhh_emplea B ON A.cod_emp = B.cod_emp COLLATE DATABASE_DEFAULT
                         LEFT JOIN rhh_familia C ON A.cod_emp = C.cod_emp COLLATE DATABASE_DEFAULT
                                                    AND A.num_ced = C.num_ced COLLATE DATABASE_DEFAULT
                         LEFT JOIN gen_parentesco D ON A.tip_fam = D.cod_par COLLATE DATABASE_DEFAULT
                         LEFT JOIN gen_tipide E ON E.cod_tip = A.tip_ide COLLATE DATABASE_DEFAULT
                         LEFT JOIN GTH_Ocupacion F ON F.cod_ocu = A.ocu_fam
                         LEFT JOIN rhh_tbclaest G ON G.tip_est = A.niv_est
                         LEFT JOIN gth_estcivil H ON A.est_civ = H.cod_est
                         LEFT JOIN gth_estcivil I ON C.est_civ = I.cod_est
                         LEFT JOIN gen_parentesco J ON A.tip_fam = J.cod_par COLLATE DATABASE_DEFAULT
                         LEFT JOIN rhh_tbclaest K ON K.tip_est = C.niv_est COLLATE DATABASE_DEFAULT
                         LEFT JOIN GTH_Ocupacion L ON L.cod_ocu = C.ocu_fam
                         LEFT JOIN GTH_Genero Gen ON Gen.cod_gen = A.sex_fam
                    WHERE A.cod_emp = @cod_emp
                          AND A.num_ced = @cod_ced
                ) P UNPIVOT(valor_nuevo FOR campo IN(nom_fam, 
                                                     ap1_fam, 
                                                     ap2_fam, 
                                                     fec_nac, 
                                                     est_civ, 
                                                     sal_bas, 
                                                     ind_sub, 
                                                     ocu_fam, 
                                                     niv_est, 
                                                     ind_comp, 
                                                     tip_fam, 
                                                     sex_fam, 
                                                     ind_conv, 
                                                     ind_pro, 
                                                     ind_adulto_mayor)) AS TN
                LEFT JOIN
                (
                    SELECT *
                    FROM
                    (
                        SELECT A.cod_emp, 
                               RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', 
                               RTRIM(A.nom_fam) + ' ' + RTRIM(A.ap1_fam) + ' ' + ISNULL(RTRIM(A.ap2_fam), '') AS nombre_fam, 
                               CAST(D.nom_par AS VARCHAR(255)) AS nom_par, 
                               A.gra_san, 
                               CAST(A.est_civ AS VARCHAR(255)) AS est_civ, 
                               CAST(RTRIM(A.niv_est) + '_' + G.des_est AS VARCHAR(255)) AS niv_est, 
                               CAST(RTRIM(A.tip_fam) + '_' + J.nom_par AS VARCHAR(255)) AS tip_fam, 
                               E.des_tip, 
                               CAST(A.num_ced AS VARCHAR(255)) AS num_ced, 
                               CAST(FORMAT(A.fec_nac, 'dd/MM/yyyy') AS VARCHAR(255)) AS fec_nac, 
                               CAST(A.nom_fam AS VARCHAR(255)) AS nom_fam, 
                               CAST(A.ap1_fam AS VARCHAR(255)) AS ap1_fam, 
                               CAST(A.ap2_fam AS VARCHAR(255)) AS ap2_fam, 
                               CAST(IIF(A.sex_fam IS NULL, '', RTRIM(A.sex_fam) + '_' + Gen.des_gen) AS VARCHAR(255)) AS sex_fam,
                               CASE A.sex_fam
                                   WHEN 1
                                   THEN 'Femenino'
                                   WHEN 2
                                   THEN 'Masculino'
                               END AS dessex_fam, 
                               H.des_est AS 'des_estCiv', 
                               G.des_est, 
                               F.des_ocu, 
                               CAST(ISNULL(A.sal_bas, '') AS VARCHAR(255)) AS sal_bas, 
                               CAST(ISNULL(A.ocu_fam, '') AS VARCHAR(255)) AS ocu_fam, 
                               CAST(IIF(A.ind_sub = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_sub, 
                               CAST(IIF(A.ind_comp = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_comp, 
                               CAST(IIF(A.ind_pro = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_pro, 
                               CAST(IIF(A.ind_conv = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_conv, 
                               CAST(IIF(A.ind_adulto_mayor = 0, '0_No', '1_Sí') AS VARCHAR(255)) AS ind_adulto_mayor,
                               --Campos para comparar con los nuevos
                               C.cod_emp AS 'T.cod_emp', 
                               RTRIM(C.nom_fam) + ' ' + RTRIM(C.ap1_fam) + ' ' + RTRIM(C.ap2_fam) AS 'T.nom_fam', 
                               J.nom_par AS 'T.nom_par', 
                               C.gra_san AS 'T.gra_san', 
                               C.fec_nac AS 'T.fec_nac', 
                               C.sex_fam AS 'T.sex_fam', 
                               I.des_est AS 'T.des_estCiv', 
                               k.des_est AS 'T.des_est', 
                               C.ind_comp AS 'T.ind_comp', 
                               L.des_ocu AS 'T.des_ocu', 
                               C.sal_bas AS 'T.sal_bas', 
                               C.ind_sub AS 'T.ind_sub', 
                               C.ind_pro AS 'T.ind_pro', 
                               C.ind_conv AS 'T.ind_conv', 
                               IIF(C.cod_emp IS NULL, 'Nuevo', '') AS TipoCambio 
                        --===================================
                        FROM rhh_familia A
                             INNER JOIN rhh_emplea B ON A.cod_emp = B.cod_emp COLLATE DATABASE_DEFAULT
                             LEFT JOIN rhh_familia C ON A.cod_emp = C.cod_emp COLLATE DATABASE_DEFAULT
                                                        AND A.num_ced = C.num_ced COLLATE DATABASE_DEFAULT
                             LEFT JOIN gen_parentesco D ON A.tip_fam = D.cod_par COLLATE DATABASE_DEFAULT
                             LEFT JOIN gen_tipide E ON E.cod_tip = A.tip_ide COLLATE DATABASE_DEFAULT
                             LEFT JOIN GTH_Ocupacion F ON F.cod_ocu = A.ocu_fam
                             LEFT JOIN rhh_tbclaest G ON G.tip_est = A.niv_est
                             LEFT JOIN gth_estcivil H ON A.est_civ = H.cod_est
                             LEFT JOIN gth_estcivil I ON C.est_civ = I.cod_est
                             LEFT JOIN gen_parentesco J ON C.tip_fam = J.cod_par COLLATE DATABASE_DEFAULT
                             LEFT JOIN rhh_tbclaest K ON K.tip_est = C.niv_est COLLATE DATABASE_DEFAULT
                             LEFT JOIN GTH_Ocupacion L ON L.cod_ocu = C.ocu_fam
                             LEFT JOIN GTH_Genero Gen ON Gen.cod_gen = A.sex_fam
                        WHERE A.cod_emp = @cod_emp
                              AND A.num_ced = @cod_ced
                    ) P UNPIVOT(valor_actual FOR campo IN(nom_fam, 
                                                          ap1_fam, 
                                                          ap2_fam, 
                                                          fec_nac, 
                                                          est_civ, 
                                                          sal_bas, 
                                                          ind_sub, 
                                                          ocu_fam, 
                                                          niv_est, 
                                                          ind_comp, 
                                                          tip_fam, 
                                                          sex_fam, 
                                                          ind_conv, 
                                                          ind_pro, 
                                                          ind_adulto_mayor)) AS TA2
                ) AS TA ON TA.campo = TN.CAMPO
                           AND TA.valor_actual <> TN.valor_nuevo
                INNER JOIN
                (
                    SELECT c.name AS Campo, 
                           value AS Descripcion
                    FROM sys.extended_properties AS ep
                         INNER JOIN sys.tables AS t ON ep.major_id = t.object_id
                         INNER JOIN sys.columns AS c ON ep.major_id = c.object_id
                                                        AND ep.minor_id = c.column_id
                    WHERE class = 1
                          AND t.name = 'rhh_portal_familia'
                ) AS EXT ON TN.campo = EXT.Campo;

                --WHERE  RTRIM(valor_actual)<>RTRIM(valor_nuevo)

            END;
    END;

```
